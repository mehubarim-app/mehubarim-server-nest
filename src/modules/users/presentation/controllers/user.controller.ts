import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { RegisterUserWithProfileDto } from '../../domain/dto/register-user-with-profile.dto';
import { User } from '../../domain/entities/user.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ConsumerProfileDataDto } from '../../../profiles/domain/dto/consumer-profile.dto';
import { OrganizationProfileDataDto } from '../../../profiles/domain/dto/organization-profile.dto';
import { Public } from '../../../auth/decorators/public.decorator';
import { ProfileType } from '../../../profiles/domain/enums/profile-type.enum';

@ApiTags('users')
@ApiExtraModels(ConsumerProfileDataDto, OrganizationProfileDataDto)
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
        value: RegisterUserWithProfileDto.exampleOrganization(),
        description: "דוגמה לרישום ארגון"
      }
    }
  })
  async registerUserWithOrganization(
    @Body() registerUserDto: RegisterUserWithProfileDto
  ): Promise<User> {
    registerUserDto.user.profileType = ProfileType.ORGANIZATION;
    registerUserDto.profile.profileType = ProfileType.ORGANIZATION;
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
        value: RegisterUserWithProfileDto.exampleConsumer(),
        description: "דוגמה לרישום צרכן"
      }
    }
  })
  async registerUserWithConsumer(
    @Body() registerUserDto: RegisterUserWithProfileDto
  ): Promise<User> {
    registerUserDto.user.profileType = ProfileType.CONSUMER;
    registerUserDto.profile.profileType = ProfileType.CONSUMER;
    return this.userService.register(registerUserDto.user, registerUserDto.profile);
  }
}
