import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DayScheduleDto } from './weekly-schedule/day-schedule.dto';
import { SWAGGER_EXAMPLES } from './constants';

export class WeeklyScheduleDto {
  @ApiProperty({
    description: 'Sunday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.sunday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  sunday: DayScheduleDto;

  @ApiProperty({
    description: 'Monday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.monday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  monday: DayScheduleDto;

  @ApiProperty({
    description: 'Tuesday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.tuesday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  tuesday: DayScheduleDto;

  @ApiProperty({
    description: 'Wednesday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.wednesday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  wednesday: DayScheduleDto;

  @ApiProperty({
    description: 'Thursday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.thursday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  thursday: DayScheduleDto;

  @ApiProperty({
    description: 'Friday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.friday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  friday: DayScheduleDto;

  @ApiProperty({
    description: 'Saturday schedule',
    type: DayScheduleDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.saturday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  saturday: DayScheduleDto;

  constructor() {
    const createDefaultTimeRange = () => ({
      id: Date.now().toString(),
      startTime: { hours: 9, minutes: 0 },
      endTime: { hours: 17, minutes: 0 }
    });

    const createDefaultDay = (title: string) => ({
      title,
      timeRanges: [createDefaultTimeRange()]
    });

    this.sunday = createDefaultDay('sunday');
    this.monday = createDefaultDay('monday');
    this.tuesday = createDefaultDay('tuesday');
    this.wednesday = createDefaultDay('wednesday');
    this.thursday = createDefaultDay('thursday');
    this.friday = createDefaultDay('friday');
    this.saturday = createDefaultDay('saturday');
  }
}
