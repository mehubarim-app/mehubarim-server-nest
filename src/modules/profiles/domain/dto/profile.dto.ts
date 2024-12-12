import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ConsumerProfileDto } from './consumer-profile.dto';
import { OrganizationProfileDto } from './organization-profile.dto';
import { ProfileType } from '../enums/profile-type.enum';

export class ProfileDto {
  static readonly examples = {
    organization: {
      profileType: ProfileType.organization,
      profileData: OrganizationProfileDto.examples.organization
    },
    consumer: {
      profileType: ProfileType.consumer,
      profileData: ConsumerProfileDto.examples.consumer
    }
  };

  @ApiProperty({
    description: 'Type of profile',
    enum: ProfileType,
    example: ProfileDto.examples.organization.profileType
  })
  @IsEnum(ProfileType)
  @IsNotEmpty()
  profileType: ProfileType;

  @ApiProperty({ 
    description: 'Profile specific data',
    oneOf: [
      { $ref: '#/components/schemas/ConsumerProfileDto' },
      { $ref: '#/components/schemas/OrganizationProfileDto' }
    ],
    example: ProfileDto.examples.organization.profileData
  })
  @ValidateNested()
  @Type((options) => {
    if (options?.object?.profileType === ProfileType.organization) {
      return OrganizationProfileDto;
    }
    if (options?.object?.profileType === ProfileType.consumer) {
      return ConsumerProfileDto;
    }
    return Object;
  })
  @IsNotEmpty()
  profileData: ConsumerProfileDto | OrganizationProfileDto;

  static organizationExample(): ProfileDto {
    const dto = new ProfileDto();
    Object.assign(dto, ProfileDto.examples.organization);
    return dto;
  }

  static consumerExample(): ProfileDto {
    const dto = new ProfileDto();
    Object.assign(dto, ProfileDto.examples.consumer);
    return dto;
  }
}
