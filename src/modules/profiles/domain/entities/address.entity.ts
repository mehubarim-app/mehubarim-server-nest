import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Address {
  @ApiProperty({ description: 'Complete address string including all components' })
  @Prop({ required: true })
  fullAddress: string;

  @ApiProperty({ description: 'Name of the city' })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ description: 'Name of the street' })
  @Prop({ required: true })
  street: string;

  @ApiProperty({ description: 'Street number or house number' })
  @Prop({ required: true })
  streetNumber: string;

  @ApiProperty({ description: 'Name of the neighborhood or district', required: false })
  @Prop()
  neighborhood?: string;

  @ApiProperty({ description: 'Geographic latitude coordinate', example: 32.0853 })
  @Prop({ required: true })
  latitude: number;

  @ApiProperty({ description: 'Geographic longitude coordinate', example: 34.7818 })
  @Prop({ required: true })
  longitude: number;

  @ApiProperty({ description: 'Direct link to location in Waze', required: false })
  @Prop()
  wazeLink?: string;

  @ApiProperty({ description: 'Direct link to location in Google Maps', required: false })
  @Prop()
  googleMapsLink?: string;

  constructor(partial: Partial<Address>) {
    // Default coordinates for Tel Aviv if none provided
    const defaultCoords = {
      latitude: 32.0853,
      longitude: 34.7818
    };

    Object.assign(this, {
      ...defaultCoords,
      ...partial
    });

    // Generate navigation links if coordinates are available
    if (this.latitude && this.longitude) {
      this.generateNavigationLinks();
    }
  }

  // Helper method to generate navigation links
  generateNavigationLinks(): void {
    this.googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`;
    this.wazeLink = `https://www.waze.com/ul?ll=${this.latitude},${this.longitude}&navigate=yes`;
  }
}

export const AddressSchema = SchemaFactory.createForClass(Address);
