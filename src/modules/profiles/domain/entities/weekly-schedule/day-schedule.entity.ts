import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TimeRange } from './time-range.entity';

@Schema()
export class DaySchedule {
  @ApiProperty({ description: 'Title of the day schedule' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Time ranges for this day', type: [TimeRange] })
  @Prop({ required: true, type: [TimeRange] })
  timeRanges: TimeRange[];

  constructor(partial: Partial<DaySchedule>) {
    Object.assign(this, partial);
  }

  isActive(): boolean {
    return this.timeRanges.length > 0;
  }

  isValid(): boolean {
    if (this.timeRanges.length === 0) return true;

    // Check each time range is valid
    if (this.timeRanges.some(range => !range.isValid())) {
      return false;
    }

    // Check for overlaps
    for (let i = 0; i < this.timeRanges.length; i++) {
      for (let j = i + 1; j < this.timeRanges.length; j++) {
        if (this.timeRanges[i].overlaps(this.timeRanges[j])) {
          return false;
        }
      }
    }

    return true;
  }
}

export const DayScheduleSchema = SchemaFactory.createForClass(DaySchedule);
