import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DayScheduleDto } from './weekly-schedule/day-schedule.dto';

export class WeeklyScheduleDto {
  static readonly examples = {
    default: {
      sunday: { ...DayScheduleDto.examples.default, title: 'sunday' },
      monday: { ...DayScheduleDto.examples.default, title: 'monday' },
      tuesday: { ...DayScheduleDto.examples.default, title: 'tuesday' },
      wednesday: { ...DayScheduleDto.examples.default, title: 'wednesday' },
      thursday: { ...DayScheduleDto.examples.default, title: 'thursday' },
      friday: { ...DayScheduleDto.examples.default, title: 'friday' },
      saturday: { ...DayScheduleDto.examples.default, title: 'saturday' }
    },
    regularWeek: {
      sunday: { title: 'sunday', timeRanges: [] },
      monday: { title: 'monday', timeRanges: [{ id: '1702347600000', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      tuesday: { title: 'tuesday', timeRanges: [{ id: '1702347600001', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      wednesday: { title: 'wednesday', timeRanges: [{ id: '1702347600002', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      thursday: { title: 'thursday', timeRanges: [{ id: '1702347600003', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      friday: { title: 'friday', timeRanges: [{ id: '1702347600004', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 13, minutes: 0 } }] },
      saturday: { title: 'saturday', timeRanges: [] }
    },
    weekendClosed: {
      sunday: { title: 'sunday', timeRanges: [] },
      monday: { title: 'monday', timeRanges: [{ id: '1702347600000', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      tuesday: { title: 'tuesday', timeRanges: [{ id: '1702347600001', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      wednesday: { title: 'wednesday', timeRanges: [{ id: '1702347600002', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      thursday: { title: 'thursday', timeRanges: [{ id: '1702347600003', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      friday: { title: 'friday', timeRanges: [{ id: '1702347600004', startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 0 } }] },
      saturday: { title: 'saturday', timeRanges: [] }
    }
  };

  @ApiProperty({
    description: 'Sunday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.sunday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  sunday: DayScheduleDto;

  @ApiProperty({
    description: 'Monday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.monday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  monday: DayScheduleDto;

  @ApiProperty({
    description: 'Tuesday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.tuesday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  tuesday: DayScheduleDto;

  @ApiProperty({
    description: 'Wednesday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.wednesday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  wednesday: DayScheduleDto;

  @ApiProperty({
    description: 'Thursday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.thursday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  thursday: DayScheduleDto;

  @ApiProperty({
    description: 'Friday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.friday
  })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  friday: DayScheduleDto;

  @ApiProperty({
    description: 'Saturday schedule',
    type: DayScheduleDto,
    example: WeeklyScheduleDto.examples.regularWeek.saturday
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

  static regularWeekExample(): WeeklyScheduleDto {
    const dto = new WeeklyScheduleDto();
    Object.assign(dto, WeeklyScheduleDto.examples.regularWeek);
    return dto;
  }

  static weekendClosedExample(): WeeklyScheduleDto {
    const dto = new WeeklyScheduleDto();
    Object.assign(dto, WeeklyScheduleDto.examples.weekendClosed);
    return dto;
  }
}
