import { Consumer } from '../entities/consumer.entity';
import { CreateConsumerDto } from '../dto/create-consumer.dto';

export interface IConsumerRepository {
  create(createConsumerDto: CreateConsumerDto): Promise<Consumer>;
  findById(id: string): Promise<Consumer>;
  findByUserId(userId: string): Promise<Consumer>;
  update(id: string, updateData: Partial<Consumer>): Promise<Consumer>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Consumer[]>;
}
