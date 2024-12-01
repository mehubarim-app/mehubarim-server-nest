import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
    enum: ['consumer', 'organization'],
    example: 'consumer' 
  })
  @IsEnum(['consumer', 'organization'])
  @IsNotEmpty()
  profileType: string;

  @ApiProperty({ 
    description: 'Registration method',
    example: 'email',
    enum: ['email', 'google', 'facebook', 'apple'] 
  })
  @IsEnum(['email', 'google', 'facebook', 'apple'])
  @IsNotEmpty()
  registeredVia: string;
}
