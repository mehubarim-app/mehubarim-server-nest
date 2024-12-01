import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Consumer } from '../../domain/entities/consumer.entity';
import { IConsumerRepository } from '../../domain/repositories/consumer.repository.interface';
import { CreateConsumerDto } from '../../domain/dto/create-consumer.dto';

@Injectable()
export class ConsumerService {
  constructor(
    @Inject('IConsumerRepository')
    private readonly consumerRepository: IConsumerRepository
  ) {}

  async createConsumer(createConsumerDto: CreateConsumerDto): Promise<Consumer> {
    return this.consumerRepository.create(createConsumerDto);
  }

  async getConsumerById(id: string): Promise<Consumer> {
    const consumer = await this.consumerRepository.findById(id);
    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return consumer;
  }

  async getConsumerByUserId(userId: string): Promise<Consumer> {
    const consumer = await this.consumerRepository.findByUserId(userId);
    if (!consumer) {
      throw new NotFoundException(`Consumer with user ID ${userId} not found`);
    }
    return consumer;
  }

  async updateConsumer(id: string, updateData: Partial<Consumer>): Promise<Consumer> {
    const updatedConsumer = await this.consumerRepository.update(id, updateData);
    if (!updatedConsumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return updatedConsumer;
  }

  async deleteConsumer(id: string): Promise<boolean> {
    const deleted = await this.consumerRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return true;
  }

  async getAllConsumers(): Promise<Consumer[]> {
    return this.consumerRepository.findAll();
  }
}
