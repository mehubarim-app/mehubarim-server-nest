import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { WeeklySchedule } from './weekly-schedule.entity';
import { Address } from './address.entity';

export type OrganizationDocument = Organization & Document;

@Schema({ timestamps: true })
export class Organization {
  @ApiProperty({ description: 'Organization MongoDB ID' })
  _id?: Types.ObjectId;

  @ApiProperty({ description: 'Organization ID' })
  @Prop()
  id?: string;

  @ApiProperty({ description: 'Organization name' })
  @Prop({ required: true })
  organizationName: string;

  @ApiProperty({ description: 'Organization description' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Contact phone number' })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ description: 'Website URL' })
  @Prop()
  website?: string;

  @ApiProperty({ description: 'Address information', type: Address })
  @Prop({ required: true, type: Address })
  address: Address;

  @ApiProperty({ description: 'Registration number' })
  @Prop({ required: false })
  registrationNumber?: string;

  @ApiProperty({ 
    description: 'Target audience (e.g., male, female, other)',
    example: ['male', 'female']
  })
  @Prop({ type: [String], required: true })
  targetAudience: string[];

  @ApiProperty({ description: 'Languages supported' })
  @Prop({ type: [String], required: true })
  languages: string[];

  @ApiProperty({ description: 'Areas of interest' })
  @Prop({ type: [String], required: true })
  interests: string[];

  @ApiProperty({ description: 'Notes about the organization' })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Weekly schedule', type: WeeklySchedule })
  @Prop({ required: true, type: WeeklySchedule })
  weeklySchedule: WeeklySchedule;

  @ApiProperty({ description: 'Building image URL' })
  @Prop()
  buildingImageUrl?: string;

  @ApiProperty({ description: 'Logo URL' })
  @Prop()
  logoUrl?: string;

  @ApiProperty({ description: 'Social media links' })
  @Prop({ type: Map, of: String })
  socialLinks: Map<string, string>;

  @ApiProperty({ description: 'Is organization verified' })
  @Prop({ default: false })
  isVerified: boolean;

  @ApiProperty({ description: 'Is organization active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Creation date' })
  createdAt?: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt?: Date;

  constructor(partial: Partial<Organization>) {
    Object.assign(this, {
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...partial
    });
  }
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
