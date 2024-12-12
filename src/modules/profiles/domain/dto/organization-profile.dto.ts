import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsOptional, IsBoolean, IsUrl } from 'class-validator';
import { AddressDto } from './address.dto';
import { WeeklyScheduleDto } from './weekly-schedule.dto';

export class OrganizationProfileDto {
  static readonly examples = {
    organization: {
      organizationName: 'ישיבת מאור התורה',
      description: 'מרכז תורני לשיעורי תורה והלכה',
      phone: '+972501234567',
      website: 'https://example.org',
      address: AddressDto.jerusalemExample(),
      registrationNumber: '580123456',
      services: ['שיעורי תורה', 'לימוד בחברותא', 'ספריה תורנית'],
      targetAudience: ['אברכים', 'בעלי בתים', 'בחורי ישיבה'],
      languages: ['עברית', 'אנגלית', 'יידיש'],
      interests: ['תורה', 'הלכה', 'מוסר'],
      notes: 'פתוח בכל ימות השבוע',
      weeklySchedule: WeeklyScheduleDto.regularWeekExample(),
      buildingImageUrl: 'https://example.org/building.jpg',
      logoUrl: 'https://example.org/logo.png',
      socialLinks: new Map([
        ['facebook', 'https://facebook.com/example'],
        ['whatsapp', 'https://wa.me/972501234567']
      ]),
      isVerified: true,
      isActive: true
    }
  };

  @ApiProperty({ 
    description: 'Organization name',
    example: OrganizationProfileDto.examples.organization.organizationName
  })
  @IsString()
  organizationName: string;

  @ApiProperty({ 
    description: 'Organization description',
    example: OrganizationProfileDto.examples.organization.description
  })
  @IsString()
  description: string;

  @ApiProperty({ 
    description: 'Contact phone number',
    example: OrganizationProfileDto.examples.organization.phone
  })
  @IsString()
  phone: string;

  @ApiProperty({ 
    description: 'Website URL',
    required: false,
    example: OrganizationProfileDto.examples.organization.website
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ 
    description: 'Address information',
    type: AddressDto,
    example: OrganizationProfileDto.examples.organization.address
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ 
    description: 'Registration number',
    required: false,
    example: OrganizationProfileDto.examples.organization.registrationNumber
  })
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiProperty({ 
    description: 'Services offered',
    example: OrganizationProfileDto.examples.organization.services
  })
  @IsArray()
  @IsString({ each: true })
  services: string[];

  @ApiProperty({ 
    description: 'Target audience',
    example: OrganizationProfileDto.examples.organization.targetAudience
  })
  @IsArray()
  @IsString({ each: true })
  targetAudience: string[];

  @ApiProperty({ 
    description: 'Languages supported',
    example: OrganizationProfileDto.examples.organization.languages
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({ 
    description: 'Areas of interest',
    example: OrganizationProfileDto.examples.organization.interests
  })
  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @ApiProperty({ 
    description: 'Notes about the organization',
    required: false,
    example: OrganizationProfileDto.examples.organization.notes
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Weekly schedule',
    type: WeeklyScheduleDto,
    example: OrganizationProfileDto.examples.organization.weeklySchedule
  })
  @ValidateNested()
  @Type(() => WeeklyScheduleDto)
  weeklySchedule: WeeklyScheduleDto;

  @ApiProperty({ 
    description: 'Building image URL',
    required: false,
    example: OrganizationProfileDto.examples.organization.buildingImageUrl
  })
  @IsString()
  @IsOptional()
  buildingImageUrl?: string;

  @ApiProperty({ 
    description: 'Logo URL',
    required: false,
    example: OrganizationProfileDto.examples.organization.logoUrl
  })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ 
    description: 'Social media links',
    required: false,
    example: OrganizationProfileDto.examples.organization.socialLinks
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

  static example(): OrganizationProfileDto {
    const dto = new OrganizationProfileDto();
    Object.assign(dto, OrganizationProfileDto.examples.organization);
    return dto;
  }
}
