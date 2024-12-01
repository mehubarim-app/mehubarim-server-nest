import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConsumerService } from '@modules/profiles/application/services/consumer.service';
import { CreateConsumerDto } from '@modules/profiles/domain/dto/create-consumer.dto';
import { Consumer } from '@modules/profiles/domain/entities/consumer.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('consumers')
@Controller('consumers')
@UseGuards(JwtAuthGuard)
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new consumer profile' })
  @ApiResponse({
    status: 201,
    description: 'The consumer profile has been successfully created.',
    type: Consumer,
  })
  async createConsumer(@Body() createConsumerDto: CreateConsumerDto): Promise<Consumer> {
    return this.consumerService.createConsumer(createConsumerDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a consumer profile by ID' })
  @ApiResponse({
    status: 200,
    description: 'The consumer profile has been successfully retrieved.',
    type: Consumer,
  })
  async getConsumerById(@Param('id') id: string): Promise<Consumer> {
    return this.consumerService.getConsumerById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get a consumer profile by user ID' })
  @ApiResponse({
    status: 200,
    description: 'The consumer profile has been successfully retrieved.',
    type: Consumer,
  })
  async getConsumerByUserId(@Param('userId') userId: string): Promise<Consumer> {
    return this.consumerService.getConsumerByUserId(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a consumer profile' })
  @ApiResponse({
    status: 200,
    description: 'The consumer profile has been successfully updated.',
    type: Consumer,
  })
  async updateConsumer(
    @Param('id') id: string,
    @Body() updateData: Partial<Consumer>,
  ): Promise<Consumer> {
    return this.consumerService.updateConsumer(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consumer profile' })
  @ApiResponse({
    status: 200,
    description: 'The consumer profile has been successfully deleted.',
  })
  async deleteConsumer(@Param('id') id: string): Promise<boolean> {
    return this.consumerService.deleteConsumer(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consumer profiles' })
  @ApiResponse({
    status: 200,
    description: 'All consumer profiles have been successfully retrieved.',
    type: [Consumer],
  })
  async getAllConsumers(): Promise<Consumer[]> {
    return this.consumerService.getAllConsumers();
  }
}
