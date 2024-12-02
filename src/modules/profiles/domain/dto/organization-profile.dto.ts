import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { 
  IsString, 
  IsOptional, 
  IsUrl, 
  ValidateNested,
  IsNotEmpty
} from 'class-validator';
import { AddressDto } from './address.dto';
import { OperatingHoursByDayDto } from './operating_hours/operating-hours-by-day.dto';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { ExampleFactory } from '../../../shared/factories/example.factory';
import { ProfileType } from '../enums/profile-type.enum';

export class OrganizationProfileDataDto {
  // @ApiProperty({ 
  //   description: 'Profile type discriminator',
  //   enum: ProfileType,
  //   example: ProfileType.ORGANIZATION
  // })
  // readonly profileType: ProfileType.ORGANIZATION = ProfileType.ORGANIZATION;

  @ApiProperty({ 
    description: 'Organization description',
    example: "מרכז תורני לשיעורי תורה והלכה"
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Phone number',
    example: '+972501234567'
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ 
    description: 'Website URL',
    example: 'https://example.org',
    required: false
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ 
    description: 'Registration number',
    example: '123456789',
    required: false
  })
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiProperty({ 
    type: AddressDto,
    example: ExampleFactory.getJerusalemAddress()
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @ApiProperty({ 
    type: OperatingHoursByDayDto,
    description: 'Operating hours by day',
    example: OperatingHoursByDayDto.examples.weeklyHours,
    required: false
  })
  @ValidateNested()
  @Type(() => OperatingHoursByDayDto)
  @IsOptional()
  operatingHours?: OperatingHoursByDayDto;

  static example(): OrganizationProfileDataDto {
    const dto = new OrganizationProfileDataDto();
    dto.description = "מרכז תורני לשיעורי תורה והלכה";
    dto.phone = ExampleFactory.getExamplePhone();
    dto.website = "https://example.org";
    dto.address = ExampleFactory.getJerusalemAddress();
    dto.operatingHours = OperatingHoursByDayDto.example();
    return dto;
  }
}
