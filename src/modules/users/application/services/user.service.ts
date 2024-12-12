import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { RegisterUserDto } from '../../domain/dto/register-user.dto';
import { ProfileDto } from '../../../profiles/domain/dto/profile.dto';
import { ProfileFactory } from '../../../profiles/application/factories/profile.factory';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly profileFactory: ProfileFactory,
    @InjectConnection() private readonly connection: Connection
  ) {}

  /**
   * Register a new user
   * @param registerUserDto User registration data
   * @param profileDto Profile data
   */
  async register(registerUserDto: RegisterUserDto, profileDto: ProfileDto): Promise<User> {
    return this.registerUser(registerUserDto, profileDto);
  }

  async registerUser(registerUserDto: RegisterUserDto, profileDto: ProfileDto): Promise<User> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmailOrNull(registerUserDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Create profile
      const profileService = this.profileFactory.getProfileService(profileDto.profileType);
      const profile = await profileService.createProfile(profileDto.profileData);

      if (!profile._id) {
        throw new Error('Profile created without an ID');
      }

      // Hash password and create user with profile ID
      const hashedPassword = await hash(registerUserDto.password, 10);
      const user = await this.userRepository.create({
        email: registerUserDto.email,
        password: hashedPassword,
        profileType: profileDto.profileType,
        profileId: profile._id.toString(), // Convert ObjectId to string
        registeredVia: registerUserDto.registeredVia || 'email',
        isEmailVerified: false,
        isProfileCompleted: true
      });

      await session.commitTransaction();
      return user;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async deleteUser(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User ID must be provided');
    }

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Validate profileId
      if (!user.profileId) {
        throw new Error('Profile ID must be provided for deletion');
      }

      // Delete profile
      const profileService = this.profileFactory.getProfileService(user.profileType);
      await profileService.deleteProfile(user.profileId);

      // Delete user
      await this.userRepository.deleteUser(userId);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Find user by email
   * @param email User email
   */
  async findByEmailOrNull(email: string): Promise<User | null> {
    return this.userRepository.findByEmailOrNull(email);
  }
  
  /**
   * Find user by ID
   * @param id User ID
   */
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Update user profile ID
   * @param userId User ID
   * @param profileId Profile ID
   */
  async updateProfileId(userId: string, profileId: string): Promise<User> {
    const user = await this.userRepository.updateProfileId(userId, profileId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Verify user's email
   * @param id User ID
   */
  async verifyEmail(id: string): Promise<User> {
    const user = await this.findById(id);
    user.isEmailVerified = true;
    return this.userRepository.update(id, user);
  }
}
