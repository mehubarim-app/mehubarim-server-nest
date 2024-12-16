import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Time {
  @ApiProperty({ description: 'Hours (0-23)', minimum: 0, maximum: 23 })
  @Prop({ required: true, min: 0, max: 23 })
  hours: number;

  @ApiProperty({ description: 'Minutes (0-59)', minimum: 0, maximum: 59 })
  @Prop({ required: true, min: 0, max: 59 })
  minutes: number;

  constructor(partial: Partial<Time>) {
    Object.assign(this, partial);
  }

  get totalMinutes(): number {
    return this.hours * 60 + this.minutes;
  }

  get formatted(): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(this.hours)}:${pad(this.minutes)}`;
  }

  isValid(): boolean {
    return this.hours >= 0 && this.hours < 24 && this.minutes >= 0 && this.minutes < 60;
  }
}

export const TimeSchema = SchemaFactory.createForClass(Time);
