import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Time } from './time.entity';

@Schema()
export class TimeRange {
  @ApiProperty({ description: 'Start time', type: Time })
  @Prop({ required: true, type: Time })
  start!: Time;

  @ApiProperty({ description: 'End time', type: Time })
  @Prop({ required: true, type: Time })
  end!: Time;

  constructor(partial: Partial<TimeRange>) {
    Object.assign(this, partial);
  }

  get startInMinutes(): number {
    return this.start.totalMinutes;
  }

  get endInMinutes(): number {
    return this.end.totalMinutes;
  }

  overlaps(other: TimeRange): boolean {
    return this.startInMinutes < other.endInMinutes && 
           this.endInMinutes > other.startInMinutes;
  }

  isValid(): boolean {
    return this.start.isValid() && 
           this.end.isValid() && 
           this.end.totalMinutes > this.start.totalMinutes;
  }

  toString(): string {
    return `${this.start.formatted}-${this.end.formatted}`;
  }
}
