import { ApiProperty } from '@nestjs/swagger';
import { ValidateIfNotEmptyString } from '../../../../common/decorators/validate-if-not-empty.decorator';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsNotEmpty,
  IsLatitude,
  IsLongitude
} from 'class-validator';
import { SWAGGER_EXAMPLES } from './constants';

export class AddressDto {

  @ApiProperty({ 
    description: 'Full address string',
    example: SWAGGER_EXAMPLES.address.telAviv.fullAddress
  })
  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @ApiProperty({ 
    description: 'City name',
    example: SWAGGER_EXAMPLES.address.telAviv.city
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ 
    description: 'Street name',
    example: SWAGGER_EXAMPLES.address.telAviv.street
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ 
    description: 'Street number',
    example: SWAGGER_EXAMPLES.address.telAviv.streetNumber
  })
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @ApiProperty({ 
    description: 'Neighborhood name',
    required: false
  })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({ 
    description: 'Latitude coordinate',
    example: SWAGGER_EXAMPLES.address.telAviv.latitude
  })
  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ 
    description: 'Longitude coordinate',
    example: SWAGGER_EXAMPLES.address.telAviv.longitude
  })
  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ 
    description: 'Waze navigation link',
    required: false,
    example: SWAGGER_EXAMPLES.address.telAviv.wazeLink
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  wazeLink?: string;

  @ApiProperty({ 
    description: 'Google Maps link',
    required: false,
    example: SWAGGER_EXAMPLES.address.telAviv.googleMapsLink
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  googleMapsLink?: string;

  constructor() {
    this.fullAddress = '';
    this.city = '';
    this.street = '';
    this.streetNumber = '';
    this.latitude = 0;
    this.longitude = 0;
    this.neighborhood = '';
  }
}
