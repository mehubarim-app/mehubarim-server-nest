import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address.entity';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';

export type ConsumerDocument = Consumer & Document;

@Schema({ timestamps: true })
export class Consumer {
  @ApiProperty({ description: 'Consumer MongoDB ID' })
  _id?: Types.ObjectId;

  @ApiProperty({ description: 'Consumer ID' })
  @Prop()
  id?: string;

  @ApiProperty({ description: 'Full name' })
  @Prop()
  fullName?: string;

  @ApiProperty({ description: 'Home address information', type: Address })
  @Prop({ type: Address })
  homeAddress?: Address;

  @ApiProperty({ description: 'Work address information', type: Address })
  @Prop({ type: Address })
  workAddress?: Address;

  @ApiProperty({ description: 'Phone number' })
  @Prop()
  phone?: string;

  @ApiProperty({ description: 'Gender', enum: Gender, enumName: 'Gender' })
  @Prop({ enum: Gender, type: String })
  gender?: Gender;

  @ApiProperty({ description: 'Age' })
  @Prop()
  age?: number;

  @ApiProperty({ description: 'Marital status', enum: MaritalStatus, enumName: 'MaritalStatus' })
  @Prop({ enum: MaritalStatus, type: String })
  maritalStatus?: MaritalStatus;

  @ApiProperty({ description: 'Areas of interest' })
  @Prop({ type: [String] })
  interests?: string[];

  @ApiProperty({ description: 'Languages spoken' })
  @Prop({ type: [String] })
  languages?: string[];

  @ApiProperty({ description: 'Profile image URL' })
  @Prop()
  profileImageUrl?: string;

  @ApiProperty({ description: 'Notes about the consumer' })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Is consumer verified' })
  @Prop({ default: false })
  isVerified: boolean;

  @ApiProperty({ description: 'Is consumer active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation date' })
  createdAt?: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt?: Date;

  constructor(partial: Partial<Consumer>) {
    Object.assign(this, {
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...partial
    });
  }
}

export const ConsumerSchema = SchemaFactory.createForClass(Consumer);
