import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ConsumerProfileDataDto } from './consumer-profile.dto';
import { OrganizationProfileDataDto } from './organization-profile.dto';
import { ProfileType } from '../enums/profile-type.enum';

export class ProfileDto {
  @ApiProperty({
    description: 'Type of profile',
    enum: ProfileType,
    example: ProfileType.organization
  })
  @IsEnum(ProfileType)
  @IsNotEmpty()
  profileType: ProfileType;

  @ApiProperty({ 
    description: 'Profile specific data',
    oneOf: [
      { $ref: '#/components/schemas/ConsumerProfileDataDto' },
      { $ref: '#/components/schemas/OrganizationProfileDataDto' }
    ]
  })
  @ValidateNested()
  @Type((options) => {
    if (options?.object?.profileType === ProfileType.organization) {
      return OrganizationProfileDataDto;
    }
    if (options?.object?.profileType === ProfileType.consumer) {
      return ConsumerProfileDataDto;
    }
    return Object;
  })
  @IsNotEmpty()
  profileData: ConsumerProfileDataDto | OrganizationProfileDataDto;
}
