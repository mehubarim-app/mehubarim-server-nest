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

export class AddressDto {
  static readonly examples = {
    fullAddress: 'הרצל 1, תל אביב',
    city: 'תל אביב',
    street: 'הרצל',
    streetNumber: '1',
    latitude: 32.0853,
    longitude: 34.7818,
    wazeLink: 'https://waze.com/ul/hsv8z8jk7k',
    googleMapsLink: 'https://goo.gl/maps/example1'
  };

  @ApiProperty({ 
    description: 'Full address string',
    example: AddressDto.examples.fullAddress
  })
  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @ApiProperty({ 
    description: 'City name',
    example: AddressDto.examples.city
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ 
    description: 'Street name',
    example: AddressDto.examples.street
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ 
    description: 'Street number',
    example: AddressDto.examples.streetNumber
  })
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @ApiProperty({ 
    description: 'Neighborhood',
    required: false
  })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({ 
    description: 'Latitude coordinate',
    example: AddressDto.examples.latitude,
    minimum: -90,
    maximum: 90
  })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ 
    description: 'Longitude coordinate',
    example: AddressDto.examples.longitude,
    minimum: -180,
    maximum: 180
  })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty({ 
    description: 'Waze link',
    example: AddressDto.examples.wazeLink,
    required: false
  })
  @ValidateIfNotEmptyString()
  @IsUrl()
  @IsOptional()
  wazeLink?: string;

  @ApiProperty({ 
    description: 'Google Maps link',
    example: AddressDto.examples.googleMapsLink,
    required: false
  })
  @ValidateIfNotEmptyString()
  @IsUrl()
  @IsOptional()
  googleMapsLink?: string;

  static example(): AddressDto {
    return {
      fullAddress: AddressDto.examples.fullAddress,
      city: AddressDto.examples.city,
      street: AddressDto.examples.street,
      streetNumber: AddressDto.examples.streetNumber,
      latitude: AddressDto.examples.latitude,
      longitude: AddressDto.examples.longitude,
      wazeLink: AddressDto.examples.wazeLink,
      googleMapsLink: AddressDto.examples.googleMapsLink
    };
  }

  constructor() {
    this.fullAddress = '';
    this.city = '';
    this.street = '';
    this.streetNumber = '';
    this.latitude = 0;
    this.longitude = 0;
    this.neighborhood = '';
    this.wazeLink = '';
    this.googleMapsLink = '';
  }
}
