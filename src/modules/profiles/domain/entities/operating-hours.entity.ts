import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { TimeRange } from './time-range.entity';

@Schema()
export class OperatingHours {
  @ApiProperty({ description: 'Day number (0-6, where 0 is Sunday)', minimum: 0, maximum: 6 })
  @Prop({ required: true, min: 0, max: 6 })
  dayNumber!: number;

  @ApiProperty({ description: 'Day of the week in Hebrew', example: 'ראשון' })
  @Prop({ required: true })
  dayOfWeek!: string;

  @ApiProperty({ description: 'Time ranges for this day', type: [TimeRange] })
  @Prop({ required: true, type: [TimeRange] })
  timeRanges!: TimeRange[];

  get isActive(): boolean {
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

  constructor(partial: Partial<OperatingHours>) {
    Object.assign(this, partial);
  }
}
