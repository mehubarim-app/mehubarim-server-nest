import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Time {
  @ApiProperty({ description: 'Hour (0-23)', minimum: 0, maximum: 23 })
  @Prop({ required: true, min: 0, max: 23 })
  hour!: number;

  @ApiProperty({ description: 'Minute (0-59)', minimum: 0, maximum: 59 })
  @Prop({ required: true, min: 0, max: 59 })
  minute!: number;

  constructor(partial: Partial<Time>) {
    Object.assign(this, partial);
  }

  get totalMinutes(): number {
    return this.hour * 60 + this.minute;
  }

  get formatted(): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(this.hour)}:${pad(this.minute)}`;
  }

  isValid(): boolean {
    return this.hour >= 0 && this.hour < 24 && this.minute >= 0 && this.minute < 60;
  }
}
