import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  IsUrl,
  ValidateNested,
  IsNotEmpty,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
  IsEnum
} from 'class-validator';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
  OTHER = 'OTHER'
}

export class CreateAddressDto {
  @ApiProperty({ 
    description: 'Full address string',
    example: 'רחוב הרצל 1, תל אביב'
  })
  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @ApiProperty({ 
    description: 'City name',
    example: 'תל אביב'
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ 
    description: 'Street name',
    example: 'הרצל'
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ 
    description: 'Street number',
    example: '1'
  })
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @ApiProperty({ 
    description: 'Neighborhood',
    example: 'פלורנטין',
    required: false
  })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({ 
    description: 'Latitude coordinate',
    example: 32.0853,
    minimum: -90,
    maximum: 90
  })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ 
    description: 'Longitude coordinate',
    example: 34.7818,
    minimum: -180,
    maximum: 180
  })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty({ 
    description: 'Waze link',
    example: 'https://waze.com/ul/123456789',
    required: false
  })
  @IsUrl()
  @IsOptional()
  wazeLink?: string;

  @ApiProperty({ 
    description: 'Google Maps link',
    example: 'https://goo.gl/maps/123456789',
    required: false
  })
  @IsUrl()
  @IsOptional()
  googleMapsLink?: string;

  constructor() {
    this.fullAddress = '';
    this.city = '';
    this.street = '';
    this.streetNumber = '';
    this.latitude = 0;
    this.longitude = 0;
    this.neighborhood = '';
    this.wazeLink = '';
    this.googleMapsLink = '';
  }
}

export class CreateConsumerDto {
  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty()
  homeAddress: CreateAddressDto;

  @ApiProperty({ 
    type: CreateAddressDto,
    required: false
  })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsOptional()
  workAddress?: CreateAddressDto;

  @ApiProperty({ 
    description: 'Phone number',
    example: '+972501234567'
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ 
    enum: Gender,
    description: 'Gender',
    example: Gender.MALE
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ 
    description: 'Age',
    example: 25,
    minimum: 0,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  age?: number;

  @ApiProperty({ 
    description: 'Languages',
    example: ['he', 'en'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiProperty({ 
    enum: MaritalStatus,
    description: 'Marital status',
    example: MaritalStatus.SINGLE
  })
  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @ApiProperty({ 
    description: 'Areas of interest',
    example: ['gemara', 'musar']
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  interests: string[];

  @ApiProperty({ 
    description: 'Profile image URL',
    example: 'https://example.com/profile.jpg',
    required: false
  })
  @IsUrl()
  @IsOptional()
  profileImageUrl?: string;

  @ApiProperty({ 
    description: 'Additional notes',
    example: 'מעוניין בלימוד בוקר',
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Is consumer verified',
    default: false,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ 
    description: 'Is consumer active',
    default: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  constructor() {
    this.homeAddress = new CreateAddressDto();
    this.phone = '';
    this.gender = Gender.MALE;
    this.maritalStatus = MaritalStatus.SINGLE;
    this.interests = [];
    this.workAddress = undefined;
    this.age = undefined;
    this.languages = undefined;
    this.profileImageUrl = undefined;
    this.notes = undefined;
    this.isVerified = false;
    this.isActive = true;
  }
}
