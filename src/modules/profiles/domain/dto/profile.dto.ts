import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { ProfileType } from '../enums/profile-type.enum';
import { ConsumerProfileDto } from './consumer-profile.dto';
import { OrganizationProfileDto } from './organization-profile.dto';
import { SWAGGER_EXAMPLES } from './constants';

export class ProfileDto {
  @ApiProperty({ 
    description: 'Profile type',
    enum: ProfileType,
    example: ProfileType.consumer
  })
  @IsEnum(ProfileType)
  @IsNotEmpty()
  profileType: ProfileType;

  @ApiProperty({ 
    description: 'Profile data',
    type: () => Object,
    example: SWAGGER_EXAMPLES.consumer
  })
  @ValidateNested()
  @Type((options) => {
    if (options?.object?.profileType === ProfileType.organization) {
      return OrganizationProfileDto;
    }
    return ConsumerProfileDto;
  })
  @IsNotEmpty()
  profileData: ConsumerProfileDto | OrganizationProfileDto;

  constructor() {
    this.profileType = ProfileType.consumer;
    this.profileData = new ConsumerProfileDto();
  }
}
