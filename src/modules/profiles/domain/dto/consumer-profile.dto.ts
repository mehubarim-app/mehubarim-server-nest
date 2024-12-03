import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsArray,
  IsBoolean
} from 'class-validator';
import { ValidateIfNotEmptyString, ValidateIfNotEmptyArray } from '../../../../common/decorators/validate-if-not-empty.decorator';
import { AddressDto } from './address.dto';
import { Gender } from '../enums/gender.enum';
import { MaritalStatus } from '../enums/marital-status.enum';
import { ExampleFactory } from '../../../shared/factories/example.factory';

export class ConsumerProfileDataDto {
  @ApiProperty({ 
    description: 'Phone number',
    example: '+972501234567'
  })
  @ValidateIfNotEmptyString()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ 
    enum: Gender,
    description: 'Gender of the user',
    example: Gender.MALE
  })
  @ValidateIfNotEmptyString()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ 
    enum: MaritalStatus,
    description: 'Marital status of the user',
    example: MaritalStatus.SINGLE
  })
  @ValidateIfNotEmptyString()
  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  maritalStatus: MaritalStatus;

  @ApiProperty({ 
    type: AddressDto,
    example: ExampleFactory.getTelAvivAddress()
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  homeAddress: AddressDto;

  @ApiProperty({ 
    description: 'Age of the user',
    example: 25,
    minimum: 18,
    maximum: 120,
    required: false
  })
  @IsNumber()
  @Min(18)
  @Max(120)
  @IsOptional()
  age?: number;

  @ApiProperty({ 
    description: 'Languages spoken by the user',
    type: [String],
    example: ExampleFactory.getExampleLanguages(),
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @ValidateIfNotEmptyArray()
  @IsOptional()
  languages?: string[];

  @ApiProperty({ 
    description: 'List of interests',
    example: ['תורה', 'הלכה', 'מוסר'],
    type: [String],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @ValidateIfNotEmptyArray()
  @IsOptional()
  interests?: string[];

  @ApiProperty({ 
    description: 'Whether the user is verified',
    example: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean = false;

  @ApiProperty({ 
    description: 'Whether the user is looking for a match',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  isLookingForMatch?: boolean;

  static example(): ConsumerProfileDataDto {
    const dto = new ConsumerProfileDataDto();
    dto.phone = '+972501234567';
    dto.gender = Gender.MALE;
    dto.maritalStatus = MaritalStatus.SINGLE;
    dto.homeAddress = ExampleFactory.getTelAvivAddress();
    dto.age = 25;
    dto.languages = ExampleFactory.getExampleLanguages();
    dto.interests = ['תורה', 'הלכה', 'מוסר'];
    dto.isVerified = false;
    dto.isLookingForMatch = true;
    return dto;
  }
}
