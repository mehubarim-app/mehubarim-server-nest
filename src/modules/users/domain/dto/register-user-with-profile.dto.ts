import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';
import { ProfileDto } from '../../../profiles/domain/dto/profile.dto';
import { ProfileType } from '../../../profiles/domain/enums/profile-type.enum';
import { ConsumerProfileDataDto } from '../../../profiles/domain/dto/consumer-profile.dto';
import { OrganizationProfileDataDto } from '../../../profiles/domain/dto/organization-profile.dto';

export class RegisterUserWithProfileDto {
  @ApiProperty({ 
    type: RegisterUserDto,
    examples: {
      organization: {
        value: RegisterUserWithProfileDto.exampleOrganization(),
        description: "דוגמה לרישום ארגון"
      },
      consumer: {
        value: RegisterUserWithProfileDto.exampleConsumer(),
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
          profileType: ProfileType.ORGANIZATION,
          profileData: OrganizationProfileDataDto.example()
        },
        description: "דוגמה לפרופיל ארגון"
      },
      consumer: {
        value: {
          profileType: ProfileType.CONSUMER,
          profileData: ConsumerProfileDataDto.example()
        },
        description: "דוגמה לפרופיל צרכן"
      }
    }
  })
  @ValidateNested()
  @Type(() => ProfileDto)
  @IsNotEmpty()
  profile: ProfileDto;

  static exampleOrganization(): RegisterUserWithProfileDto {
    const dto = new RegisterUserWithProfileDto();
    dto.user = RegisterUserDto.exampleOrganization();
    dto.profile = {
      profileType: ProfileType.ORGANIZATION,
      profileData: OrganizationProfileDataDto.example()
    };
    return dto;
  }

  static exampleConsumer(): RegisterUserWithProfileDto {
    const dto = new RegisterUserWithProfileDto();
    dto.user = RegisterUserDto.exampleConsumer();
    dto.profile = {
      profileType: ProfileType.CONSUMER,
      profileData: ConsumerProfileDataDto.example()
    };
    return dto;
  }
}
