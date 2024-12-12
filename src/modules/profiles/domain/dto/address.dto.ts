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
    telAviv: {
      fullAddress: 'הרצל 1, תל אביב',
      city: 'תל אביב',
      street: 'הרצל',
      streetNumber: '1',
      latitude: 32.0853,
      longitude: 34.7818,
      wazeLink: 'https://waze.com/ul/hsv8z8jk7k',
      googleMapsLink: 'https://goo.gl/maps/example1'
    },
    jerusalem: {
      fullAddress: 'יפו 97, ירושלים',
      city: 'ירושלים',
      street: 'יפו',
      streetNumber: '97',
      latitude: 31.7857,
      longitude: 35.2007,
      wazeLink: 'https://waze.com/ul/hsv8z8jk7j',
      googleMapsLink: 'https://goo.gl/maps/example2'
    }
  };

  @ApiProperty({ 
    description: 'Full address string',
    example: AddressDto.examples.telAviv.fullAddress
  })
  @IsString()
  @IsNotEmpty()
  fullAddress: string;

  @ApiProperty({ 
    description: 'City name',
    example: AddressDto.examples.telAviv.city
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ 
    description: 'Street name',
    example: AddressDto.examples.telAviv.street
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ 
    description: 'Street number',
    example: AddressDto.examples.telAviv.streetNumber
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
    example: AddressDto.examples.telAviv.latitude
  })
  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ 
    description: 'Longitude coordinate',
    example: AddressDto.examples.telAviv.longitude
  })
  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ 
    description: 'Waze navigation link',
    required: false,
    example: AddressDto.examples.telAviv.wazeLink
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  wazeLink?: string;

  @ApiProperty({ 
    description: 'Google Maps link',
    required: false,
    example: AddressDto.examples.telAviv.googleMapsLink
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  googleMapsLink?: string;

  static example(): AddressDto {
    const dto = new AddressDto();
    Object.assign(dto, AddressDto.examples.telAviv);
    return dto;
  }

  static telAvivExample(): AddressDto {
    const dto = new AddressDto();
    Object.assign(dto, AddressDto.examples.telAviv);
    return dto;
  }

  static jerusalemExample(): AddressDto {
    const dto = new AddressDto();
    Object.assign(dto, AddressDto.examples.jerusalem);
    return dto;
  }

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
