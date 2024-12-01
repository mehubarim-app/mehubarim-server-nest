import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { RegisterUserDto } from '../../domain/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  /**
   * Register a new user
   * @param registerUserDto User registration data
   */
  async register(registerUserDto: RegisterUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(registerUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hash(registerUserDto.password, 10);

    // Create user
    const user = await this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    return user;
  }

  /**
   * Find user by email
   * @param email User email
   */
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
