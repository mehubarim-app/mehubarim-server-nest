import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ExampleFactory } from '../../../shared/factories/example.factory';
import { ProfileType } from '../../../profiles/domain/enums/profile-type.enum';

export class RegisterUserDto {
  @ApiProperty({ 
    description: 'User email address',
    example: 'user@example.com' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'User password',
    minLength: 6 
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ 
    description: 'User full name',
    example: 'John Doe' 
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ 
    description: 'Type of profile',
    enum: ProfileType,
    enumName: 'ProfileType'
  })
  @IsEnum(ProfileType)
  @IsNotEmpty()
  profileType: ProfileType;

  @ApiProperty({ 
    description: 'Registration method',
    example: 'email',
    enum: ['email', 'google', 'facebook', 'apple'] 
  })
  @IsEnum(['email', 'google', 'facebook', 'apple'])
  @IsNotEmpty()
  registeredVia: string;

  static exampleConsumer(): RegisterUserDto {
    const dto = new RegisterUserDto();
    dto.email = ExampleFactory.getExampleConsumerEmail();
    dto.password = ExampleFactory.getExamplePassword();
    dto.fullName = ExampleFactory.getExampleConsumerName();
    dto.profileType = ProfileType.consumer;
    dto.registeredVia = "email";
    return dto;
  }

  static exampleOrganization(): RegisterUserDto {
    const dto = new RegisterUserDto();
    dto.email = ExampleFactory.getExampleOrganizationEmail();
    dto.password = ExampleFactory.getExamplePassword();
    dto.fullName = ExampleFactory.getExampleOrganizationName();
    dto.profileType = ProfileType.organization;
    dto.registeredVia = "email";
    return dto;
  }
}
