import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consumer } from '../../domain/entities/consumer.entity';
import { IConsumerRepository } from '../../domain/repositories/consumer.repository.interface';
import { CreateConsumerDto } from '../../domain/dto/create-consumer.dto';

@Injectable()
export class ConsumerRepository implements IConsumerRepository {
  constructor(
    @InjectModel(Consumer.name)
    private readonly consumerModel: Model<Consumer>,
  ) {}

  async create(createConsumerDto: CreateConsumerDto): Promise<Consumer> {
    const consumer = new this.consumerModel(createConsumerDto);
    return consumer.save();
  }

  async findById(id: string): Promise<Consumer> {
    const consumer = await this.consumerModel.findById(id).exec();
    if (!consumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return consumer;
  }

  async findByUserId(userId: string): Promise<Consumer> {
    const consumer = await this.consumerModel.findOne({ userId }).exec();
    if (!consumer) {
      throw new NotFoundException(`Consumer with user ID ${userId} not found`);
    }
    return consumer;
  }

  async update(id: string, updateData: Partial<Consumer>): Promise<Consumer> {
    const updatedConsumer = await this.consumerModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedConsumer) {
      throw new NotFoundException(`Consumer with ID ${id} not found`);
    }
    return updatedConsumer;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.consumerModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async findAll(): Promise<Consumer[]> {
    return this.consumerModel.find().exec();
  }
}
