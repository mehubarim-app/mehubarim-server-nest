import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { AddressDto } from './address.dto';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';

export class ConsumerProfileDto {
  static readonly examples = {
    consumer: {
      fullName: 'ישראל ישראלי',
      homeAddress: AddressDto.jerusalemExample(),
      workAddress: AddressDto.telAvivExample(),
      phone: '+972501234567',
      gender: Gender.male,
      age: 25,
      maritalStatus: MaritalStatus.single,
      interests: ['תורה', 'הלכה', 'מוסר'],
      languages: ['עברית', 'אנגלית'],
      profileImageUrl: 'https://example.org/profile.jpg',
      notes: 'מחפש חברותא ללימוד גמרא',
      isVerified: false,
      isActive: false
    }
  };

  @ApiProperty({ 
    description: 'Full name',
    example: ConsumerProfileDto.examples.consumer.fullName
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ 
    description: 'Home address information',
    type: AddressDto,
    example: ConsumerProfileDto.examples.consumer.homeAddress
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  homeAddress?: AddressDto;

  @ApiProperty({ 
    description: 'Work address information',
    type: AddressDto,
    example: ConsumerProfileDto.examples.consumer.workAddress
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  workAddress?: AddressDto;

  @ApiProperty({ 
    description: 'Phone number',
    example: ConsumerProfileDto.examples.consumer.phone
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ 
    description: 'Gender',
    enum: Gender,
    enumName: 'Gender',
    example: ConsumerProfileDto.examples.consumer.gender
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ 
    description: 'Age',
    example: ConsumerProfileDto.examples.consumer.age
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({ 
    description: 'Marital status',
    enum: MaritalStatus,
    enumName: 'MaritalStatus',
    example: ConsumerProfileDto.examples.consumer.maritalStatus
  })
  @IsEnum(MaritalStatus)
  @IsOptional()
  maritalStatus?: MaritalStatus;

  @ApiProperty({ 
    description: 'Areas of interest',
    example: ConsumerProfileDto.examples.consumer.interests
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];

  @ApiProperty({ 
    description: 'Languages spoken',
    example: ConsumerProfileDto.examples.consumer.languages
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiProperty({ 
    description: 'Profile image URL',
    example: ConsumerProfileDto.examples.consumer.profileImageUrl
  })
  @IsString()
  @IsOptional()
  profileImageUrl?: string;

  @ApiProperty({ 
    description: 'Notes about the consumer',
    example: ConsumerProfileDto.examples.consumer.notes
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Is consumer verified',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean = false;

  @ApiProperty({ 
    description: 'Is consumer active',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = false;

  static example(): ConsumerProfileDto {
    const dto = new ConsumerProfileDto();
    Object.assign(dto, ConsumerProfileDto.examples.consumer);
    return dto;
  }
}
