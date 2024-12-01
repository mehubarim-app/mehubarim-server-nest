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
  IsLongitude
} from 'class-validator';
import { CreateAddressDto } from './create-consumer.dto';
import { CreateOperatingHoursDto } from './create-operating-hours.dto';

export class CreateOrganizationDto {
  @ApiProperty({ 
    description: 'Organization description',
    example: 'מרכז תורני לשיעורי תורה והלכה'
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

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({ 
    description: 'Registration number',
    example: '580123456'
  })
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty({ 
    description: 'Services offered',
    example: ['שיעורי תורה', 'שיעורי הלכה', 'חברותות']
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  services: string[];

  @ApiProperty({ 
    description: 'Target audience',
    example: ['מבוגרים', 'נוער']
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  targetAudience: string[];

  @ApiProperty({ 
    description: 'Languages supported',
    example: ['he', 'en']
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  languages: string[];

  @ApiProperty({ 
    description: 'Areas of interest',
    example: ['gemara', 'musar']
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  interests: string[];

  @ApiProperty({ 
    description: 'Additional notes',
    example: 'פתוח בכל ימות השבוע',
    required: false
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Operating hours',
    type: [CreateOperatingHoursDto]
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOperatingHoursDto)
  @IsNotEmpty()
  operatingHours: CreateOperatingHoursDto[];

  @ApiProperty({ 
    description: 'Is organization verified',
    default: false,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({ 
    description: 'Is organization active',
    default: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ 
    description: 'Building image URL',
    example: 'https://example.com/building.jpg',
    required: false
  })
  @IsUrl()
  @IsOptional()
  buildingImageUrl?: string;

  @ApiProperty({ 
    description: 'Logo URL',
    example: 'https://example.com/logo.png',
    required: false
  })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ 
    description: 'Social media links',
    example: {
      facebook: 'https://facebook.com/org',
      instagram: 'https://instagram.com/org'
    }
  })
  @ValidateNested()
  @Type(() => Map)
  @IsNotEmpty()
  socialLinks: Map<string, string>;
}
