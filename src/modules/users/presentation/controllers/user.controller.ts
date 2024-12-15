import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { RegisterUserWithProfileDto } from '../../domain/dto/register-user-with-profile.dto';
import { User } from '../../domain/entities/user.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ConsumerProfileDto } from '../../../profiles/domain/dto/consumer-profile.dto';
import { OrganizationProfileDto } from '../../../profiles/domain/dto/organization-profile.dto';
import { Public } from '../../../auth/decorators/public.decorator';
import { ProfileType } from '../../../profiles/domain/enums/profile-type.enum';
import { SWAGGER_EXAMPLES } from '../../../profiles/domain/dto/constants';
import { RegisterUserDto } from '../../domain/dto/register-user.dto';

@ApiTags('users')
@ApiExtraModels(ConsumerProfileDto, OrganizationProfileDto)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register/organization')
  @ApiOperation({ summary: 'Register a new organization user' })
  @ApiResponse({ status: 201, description: 'Organization user successfully created', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiBody({ 
    type: RegisterUserWithProfileDto,
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
      }
    }
  })
  async registerUserWithOrganization(
    @Body() registerUserDto: RegisterUserWithProfileDto
  ): Promise<User> {
    registerUserDto.user.profileType = ProfileType.organization;
    registerUserDto.profile.profileType = ProfileType.organization;
    return this.userService.register(registerUserDto.user, registerUserDto.profile);
  }

  @Public()
  @Post('register/consumer')
  @ApiOperation({ summary: 'Register a new consumer user' })
  @ApiResponse({ status: 201, description: 'Consumer user successfully created', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
  @ApiBody({ 
    type: RegisterUserWithProfileDto,
    examples: {
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
  async registerUserWithConsumer(
    @Body() registerUserDto: RegisterUserWithProfileDto
  ): Promise<User> {
    registerUserDto.user.profileType = ProfileType.consumer;
    registerUserDto.profile.profileType = ProfileType.consumer;
    return this.userService.register(registerUserDto.user, registerUserDto.profile);
  }
}
