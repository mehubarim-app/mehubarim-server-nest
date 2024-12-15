import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUrl, ValidateNested, IsOptional } from 'class-validator';
import { AddressDto } from './address.dto';
import { WeeklyScheduleDto } from './weekly-schedule.dto';
import { SWAGGER_EXAMPLES } from './constants';

export class OrganizationProfileDto {

  @ApiProperty({ 
    description: 'Organization name',
    example: SWAGGER_EXAMPLES.organization.organizationName
  })
  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty({ 
    description: 'Organization description',
    example: SWAGGER_EXAMPLES.organization.description
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Contact phone number',
    example: SWAGGER_EXAMPLES.organization.phone
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ 
    description: 'Website URL',
    required: false,
    example: SWAGGER_EXAMPLES.organization.website
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ 
    description: 'Address information',
    type: AddressDto,
    example: SWAGGER_EXAMPLES.organization.address
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @ApiProperty({ 
    description: 'Registration number',
    required: false,
    example: SWAGGER_EXAMPLES.organization.registrationNumber
  })
  @IsString()
  @IsOptional()
  registrationNumber?: string;


  @ApiProperty({ 
    description: 'Target audience',
    example: SWAGGER_EXAMPLES.organization.targetAudience
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  targetAudience: string[];

  @ApiProperty({ 
    description: 'Languages supported',
    example: SWAGGER_EXAMPLES.organization.languages
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  languages: string[];

  @ApiProperty({ 
    description: 'Areas of interest',
    example: SWAGGER_EXAMPLES.organization.interests
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  interests: string[];

  @ApiProperty({ 
    description: 'Notes about the organization',
    required: false,
    example: SWAGGER_EXAMPLES.organization.notes
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Weekly schedule',
    type: WeeklyScheduleDto,
    example: SWAGGER_EXAMPLES.organization.weeklySchedule
  })
  @ValidateNested()
  @Type(() => WeeklyScheduleDto)
  @IsNotEmpty()
  weeklySchedule: WeeklyScheduleDto;

  @ApiProperty({ 
    description: 'Building image URL',
    required: false,
    example: SWAGGER_EXAMPLES.organization.buildingImageUrl
  })
  @IsString()
  @IsOptional()
  buildingImageUrl?: string;

  @ApiProperty({ 
    description: 'Logo URL',
    required: false,
    example: SWAGGER_EXAMPLES.organization.logoUrl
  })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ 
    description: 'Social media links',
    required: false,
    example: SWAGGER_EXAMPLES.organization.socialLinks
  })
  @IsOptional()
  socialLinks?: Map<string, string>;

  @ApiProperty({ 
    description: 'Is organization verified',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean = false;

  @ApiProperty({ 
    description: 'Is organization active',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = false;

  constructor() {
    this.organizationName = '';
    this.description = '';
    this.phone = '';
    this.address = new AddressDto();
    this.targetAudience = [];
    this.languages = [];
    this.interests = [];
    this.weeklySchedule = new WeeklyScheduleDto();
    this.socialLinks = new Map();
  }
}
