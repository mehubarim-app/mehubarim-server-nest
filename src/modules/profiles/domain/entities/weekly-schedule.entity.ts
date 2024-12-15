import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { DaySchedule } from './weekly-schedule/day-schedule.entity';

@Schema()
export class WeeklySchedule {
  @ApiProperty({ description: 'Sunday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  sunday: DaySchedule;

  @ApiProperty({ description: 'Monday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  monday: DaySchedule;

  @ApiProperty({ description: 'Tuesday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  tuesday: DaySchedule;

  @ApiProperty({ description: 'Wednesday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  wednesday: DaySchedule;

  @ApiProperty({ description: 'Thursday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  thursday: DaySchedule;

  @ApiProperty({ description: 'Friday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  friday: DaySchedule;

  @ApiProperty({ description: 'Saturday schedule', type: DaySchedule })
  @Prop({ required: true, type: DaySchedule })
  saturday: DaySchedule;

  constructor(partial: Partial<WeeklySchedule>) {
    Object.assign(this, partial);
  }

  isValid(): boolean {
    return [
      this.sunday,
      this.monday,
      this.tuesday,
      this.wednesday,
      this.thursday,
      this.friday,
      this.saturday
    ].every(day => day.isValid);
  }

  hasActivity(): boolean {
    return [
      this.sunday,
      this.monday,
      this.tuesday,
      this.wednesday,
      this.thursday,
      this.friday,
      this.saturday
    ].some(day => day.isActive);
  }
}

export const WeeklyScheduleSchema = SchemaFactory.createForClass(WeeklySchedule);
