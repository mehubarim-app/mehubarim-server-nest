import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Address {
  @ApiProperty({ description: 'Full address string' })
  @Prop({ required: true })
  fullAddress!: string;

  @ApiProperty({ description: 'City name' })
  @Prop({ required: true })
  city!: string;

  @ApiProperty({ description: 'Street name' })
  @Prop({ required: true })
  street!: string;

  @ApiProperty({ description: 'Street number' })
  @Prop({ required: true })
  streetNumber!: string;

  @ApiProperty({ description: 'Neighborhood', required: false })
  @Prop()
  neighborhood?: string;

  @ApiProperty({ description: 'Latitude coordinate' })
  @Prop({ required: true })
  latitude!: number;

  @ApiProperty({ description: 'Longitude coordinate' })
  @Prop({ required: true })
  longitude!: number;

  @ApiProperty({ description: 'Waze link', required: false })
  @Prop()
  wazeLink?: string;

  @ApiProperty({ description: 'Google Maps link', required: false })
  @Prop()
  googleMapsLink?: string;

  constructor(partial: Partial<Address>) {
    Object.assign(this, partial);
  }

  // Helper method to generate navigation links
  generateNavigationLinks(): void {
    if (this.latitude && this.longitude) {
      this.googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`;
      this.wazeLink = `https://www.waze.com/ul?ll=${this.latitude},${this.longitude}&navigate=yes`;
    }
  }
}

export const AddressSchema = SchemaFactory.createForClass(Address);
