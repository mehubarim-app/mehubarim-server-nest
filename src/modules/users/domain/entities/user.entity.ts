import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'User email address' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'User password (hashed)' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Type of profile (consumer/organization)' })
  @Prop({ required: true, enum: ['consumer', 'organization'] })
  profileType: string;

  @ApiProperty({ description: 'ID of the associated profile' })
  @Prop()
  profileId?: string;

  @ApiProperty({ description: 'Email verification status' })
  @Prop({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'Profile completion status' })
  @Prop({ default: false })
  isProfileCompleted: boolean;

  @ApiProperty({ description: 'Registration method' })
  @Prop({ required: true })
  registeredVia: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
