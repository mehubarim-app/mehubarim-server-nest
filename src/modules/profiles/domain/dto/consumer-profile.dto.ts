import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { AddressDto } from './address.dto';
import { SWAGGER_EXAMPLES } from './constants';

export class ConsumerProfileDto {
  @ApiProperty({ 
    description: 'Full name',
    example: SWAGGER_EXAMPLES.consumer.fullName
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ 
    description: 'Home address',
    type: AddressDto,
    example: SWAGGER_EXAMPLES.consumer.homeAddress
  })
  @ValidateNested()
  @Type(() => AddressDto)
  homeAddress: AddressDto;

  @ApiProperty({ 
    description: 'Work address',
    type: AddressDto,
    required: false,
    example: SWAGGER_EXAMPLES.consumer.workAddress
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  workAddress?: AddressDto;

  @ApiProperty({ 
    description: 'Phone number',
    example: SWAGGER_EXAMPLES.consumer.phone,
    required: false
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ 
    description: 'Gender',
    enum: Gender,
    example: SWAGGER_EXAMPLES.consumer.gender
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ 
    description: 'Age',
    example: SWAGGER_EXAMPLES.consumer.age
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ 
    description: 'Marital status',
    enum: MaritalStatus,
    example: SWAGGER_EXAMPLES.consumer.maritalStatus
  })
  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @ApiProperty({ 
    description: 'Interests',
    type: [String],
    example: SWAGGER_EXAMPLES.consumer.interests
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  interests: string[];

  @ApiProperty({ 
    description: 'Languages',
    type: [String],
    example: SWAGGER_EXAMPLES.consumer.languages
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  languages: string[];


  @ApiProperty({ 
    description: 'Additional notes',
    example: SWAGGER_EXAMPLES.consumer.notes,
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Whether the consumer is verified',
    example: SWAGGER_EXAMPLES.consumer.isVerified
  })
  @IsBoolean()
  @IsNotEmpty()
  isVerified: boolean;

  @ApiProperty({ 
    description: 'Whether the consumer is active',
    example: SWAGGER_EXAMPLES.consumer.isActive
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  constructor() {
    this.fullName = '';
    this.homeAddress = new AddressDto();
    this.phone = '';
    this.gender = Gender.male;
    this.age = 0;
    this.maritalStatus = MaritalStatus.single;
    this.interests = [];
    this.languages = [];
    this.notes = '';
    this.isVerified = false;
    this.isActive = true;
  }
}
