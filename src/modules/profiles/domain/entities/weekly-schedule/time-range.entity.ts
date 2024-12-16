import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Time } from './time.entity';

@Schema()
export class TimeRange {
  @ApiProperty({ description: 'Unique identifier for the time range' })
  @Prop({ required: true })
  id: string;

  @ApiProperty({ description: 'Start time', type: Time })
  @Prop({ required: true, type: Time })
  startTime: Time;

  @ApiProperty({ description: 'End time', type: Time })
  @Prop({ required: true, type: Time })
  endTime: Time;

  constructor(partial: Partial<TimeRange>) {
    Object.assign(this, partial);
  }

  get startInMinutes(): number {
    return this.startTime.totalMinutes;
  }

  get endInMinutes(): number {
    return this.endTime.totalMinutes;
  }

  overlaps(other: TimeRange): boolean {
    return this.startInMinutes < other.endInMinutes && 
           this.endInMinutes > other.startInMinutes;
  }

  isValid(): boolean {
    return this.startTime.isValid() && 
           this.endTime.isValid() && 
           this.endTime.totalMinutes > this.startTime.totalMinutes;
  }

  toString(): string {
    return `${this.startTime.formatted}-${this.endTime.formatted}`;
  }
}

export const TimeRangeSchema = SchemaFactory.createForClass(TimeRange);
