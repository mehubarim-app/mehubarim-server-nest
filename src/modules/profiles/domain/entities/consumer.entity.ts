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

  @ApiProperty({ description: 'Consumer ID', required: false })
  @Prop()
  id?: string;

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

  @ApiProperty({ description: 'Age', required: false })
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

  @ApiProperty({ description: 'Additional notes' })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Is profile verified' })
  @Prop({ default: false })
  isVerified?: boolean;

  @ApiProperty({ description: 'Is profile active' })
  @Prop({ default: true })
  isActive?: boolean;

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

// Explicitly remove the email index if it exists
ConsumerSchema.indexes().forEach(index => {
  if (index[0].email) {
    ConsumerSchema.index({ email: 1 }, { unique: false });
  }
});

// Remove the email index completely as email is handled in User entity
