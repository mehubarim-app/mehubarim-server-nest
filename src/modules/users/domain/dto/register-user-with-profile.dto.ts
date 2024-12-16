import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';
import { ProfileDto } from '../../../profiles/domain/dto/profile.dto';
import { ProfileType } from '../../../profiles/domain/enums/profile-type.enum';
import { ConsumerProfileDto } from '../../../profiles/domain/dto/consumer-profile.dto';
import { OrganizationProfileDto } from '../../../profiles/domain/dto/organization-profile.dto';
import { SWAGGER_EXAMPLES } from '../../../profiles/domain/dto/constants';

export class RegisterUserWithProfileDto {
  @ApiProperty({ 
    type: RegisterUserDto,
    examples: {
      organization: {
        value: {
          user: RegisterUserDto.exampleOrganization(),
          profile: {
            profileType: ProfileType.organization,
            profileData: SWAGGER_EXAMPLES.organization
          }
        },
        description: "דוגמה לרישום ארגון"
      },
      consumer: {
        value: {
          user: RegisterUserDto.exampleConsumer(),
          profile: {
            profileType: ProfileType.consumer,
            profileData: SWAGGER_EXAMPLES.consumer
          }
        },
        description: "דוגמה לרישום צרכן"
      }
    }
  })
  @ValidateNested()
  @Type(() => RegisterUserDto)
  @IsNotEmpty()
  user: RegisterUserDto;

  @ApiProperty({ 
    type: ProfileDto,
    examples: {
      organization: {
        value: {
          profileType: ProfileType.organization,
          profileData: SWAGGER_EXAMPLES.organization
        },
        description: "דוגמה לפרופיל ארגון"
      },
      consumer: {
        value: {
          profileType: ProfileType.consumer,
          profileData: SWAGGER_EXAMPLES.consumer
        },
        description: "דוגמה לפרופיל צרכן"
      }
    }
  })
  @ValidateNested()
  @Type(() => ProfileDto)
  @IsNotEmpty()
  profile: ProfileDto;

  constructor() {
    this.user = new RegisterUserDto();
    this.profile = new ProfileDto();
  }
}
