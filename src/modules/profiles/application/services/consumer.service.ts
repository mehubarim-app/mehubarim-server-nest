import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Consumer } from '../../domain/entities/consumer.entity';
import { Gender } from '../../domain/enums/gender.enum';
import { MaritalStatus } from '../../domain/enums/marital-status.enum';
import { IConsumerRepository } from '../../domain/repositories/consumer.repository.interface';
import { ConsumerProfileDataDto } from '../../domain/dto/consumer-profile.dto';
import { ProfileService } from '../../domain/interfaces/profile.service.interface';
import { Address } from '../../domain/entities/address.entity';

@Injectable()
export class ConsumerService implements ProfileService {
  constructor(
    @Inject('IConsumerRepository')
    private readonly consumerRepository: IConsumerRepository
  ) {}

  async createProfile(consumerDto: ConsumerProfileDataDto): Promise<Consumer> {
    // Convert AddressDto to Address entity
    const homeAddress = consumerDto.homeAddress ? new Address(consumerDto.homeAddress) : undefined;
    if (homeAddress) {
      homeAddress.generateNavigationLinks();
    }

    const workAddress = consumerDto.workAddress ? new Address(consumerDto.workAddress) : undefined;
    if (workAddress) {
      workAddress.generateNavigationLinks();
    }

    // Create consumer with required fields
    const consumer = new Consumer({
      homeAddress,
      workAddress,
      phone: consumerDto.phone,
      gender: consumerDto.gender,
      maritalStatus: consumerDto.maritalStatus,
      interests: consumerDto.interests || []
    });
    
    // Optional fields
    if (consumerDto.age) consumer.age = consumerDto.age;
    if (consumerDto.languages) consumer.languages = consumerDto.languages;
    if (consumerDto.isVerified !== undefined) consumer.isVerified = consumerDto.isVerified;

    return this.consumerRepository.create(consumer);
  }

  async updateProfile(id: string, updateConsumerDto: Partial<Consumer>): Promise<Consumer> {
    const updatedConsumer = await this.consumerRepository.update(id, updateConsumerDto);
    if (!updatedConsumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return updatedConsumer;
  }

  async deleteProfile(id: string): Promise<boolean> {
    const deleted = await this.consumerRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return true;
  }

  async getProfile(id: string): Promise<Consumer> {
    const consumer = await this.consumerRepository.findById(id);
    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return consumer;
  }

  // Helper methods that delegate to getProfile
  async getProfileById(id: string): Promise<Consumer> {
    return this.getProfile(id);
  }

  async getProfileByUserId(userId: string): Promise<Consumer> {
    const consumer = await this.consumerRepository.findByUserId(userId);
    if (!consumer) {
      throw new NotFoundException(`Consumer with user ID ${userId} not found`);
    }
    return consumer;
  }

  async getAllProfiles(): Promise<Consumer[]> {
    return this.consumerRepository.findAll();
  }
}
