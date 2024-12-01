import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { OperatingHours } from './operating-hours.entity';
import { Address } from './address.entity';

export type OrganizationDocument = Organization & Document;

@Schema({ timestamps: true })
export class Organization {
  @ApiProperty({ description: 'Organization ID' })
  @Prop({ required: true })
  id!: string;

  @ApiProperty({ description: 'Organization description' })
  @Prop({ required: true })
  description!: string;

  @ApiProperty({ description: 'Contact phone number' })
  @Prop({ required: true })
  phone!: string;

  @ApiProperty({ description: 'Website URL' })
  @Prop()
  website?: string;

  @ApiProperty({ description: 'Address information', type: Address })
  @Prop({ required: true, type: Address })
  address!: Address;

  @ApiProperty({ description: 'Registration number' })
  @Prop({ required: true })
  registrationNumber!: string;

  @ApiProperty({ description: 'Services offered' })
  @Prop({ type: [String], required: true })
  services!: string[];

  @ApiProperty({ description: 'Target audience' })
  @Prop({ type: [String], required: true })
  targetAudience!: string[];

  @ApiProperty({ description: 'Languages supported' })
  @Prop({ type: [String], required: true })
  languages!: string[];

  @ApiProperty({ description: 'Areas of interest' })
  @Prop({ type: [String], required: true })
  interests!: string[];

  @ApiProperty({ description: 'Additional notes' })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Operating hours', type: [OperatingHours] })
  @Prop({ type: [OperatingHours], required: true })
  operatingHours!: OperatingHours[];

  @ApiProperty({ description: 'Profile verification status' })
  @Prop({ default: false })
  isVerified?: boolean;

  @ApiProperty({ description: 'Profile active status' })
  @Prop({ default: true })
  isActive?: boolean;

  @ApiProperty({ description: 'Building image URL' })
  @Prop()
  buildingImageUrl?: string;

  @ApiProperty({ description: 'Logo URL' })
  @Prop()
  logoUrl?: string;

  @ApiProperty({ description: 'Social media links' })
  @Prop({ type: Map, of: String })
  socialLinks!: Map<string, string>;

  @ApiProperty({ description: 'Creation date' })
  createdAt?: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt?: Date;

  constructor(partial: Partial<Organization>) {
    Object.assign(this, partial);
  }
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
