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
import { Consumer } from '@modules/profiles/domain/entities/consumer.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('consumers')
@Controller('consumers')
@UseGuards(JwtAuthGuard)
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  // Removed direct creation of consumer profiles
  // @Post()
  // @ApiOperation({ summary: 'Create a new consumer profile' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The consumer profile has been successfully created.',
  //   type: Consumer,
  // })
  // async createConsumer(@Body() ConsumerDto: ConsumerDto): Promise<Consumer> {
  //   return this.consumerService.createProfile(ConsumerDto);
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get a consumer profile by ID' })
  @ApiResponse({
    status: 200,
    description: 'The consumer profile has been successfully retrieved.',
    type: Consumer,
  })
  async getConsumerById(@Param('id') id: string): Promise<Consumer> {
    return this.consumerService.getProfileById(id);
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
    @Body() updateConsumerDto: Partial<Consumer>,
  ): Promise<Consumer> {
    return this.consumerService.updateProfile(id, updateConsumerDto);
  }

  // @Get('user/:userId')
  // @ApiOperation({ summary: 'Get a consumer profile by user ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The consumer profile has been successfully retrieved.',
  //   type: Consumer,
  // })
  // async getConsumerByUserId(@Param('userId') userId: string): Promise<Consumer> {
  //   return this.consumerService.getProfileByUserId(userId);
  // }


  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a consumer profile' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The consumer profile has been successfully deleted.',
  // })
  // async deleteConsumer(@Param('id') id: string): Promise<boolean> {
  //   return this.consumerService.deleteProfile(id);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Get all consumer profiles' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'All consumer profiles have been successfully retrieved.',
  //   type: [Consumer],
  // })
  // async getAllConsumers(): Promise<Consumer[]> {
  //   return this.consumerService.getAllProfiles();
  // }
}
