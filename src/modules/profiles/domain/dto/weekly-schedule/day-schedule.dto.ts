import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TimeRangeDto } from './time-range.dto';

export class DayScheduleDto {
  static readonly examples = {
    default: {
      title: 'sunday',
      timeRanges: [TimeRangeDto.examples.default]
    }
  };

  @ApiProperty({ 
    description: 'Day of the week (sunday, monday, etc.)',
    example: DayScheduleDto.examples.default.title
  })
  @IsString()
  title: string;

  @ApiProperty({ 
    description: 'Time ranges for this day',
    type: [TimeRangeDto],
    example: DayScheduleDto.examples.default.timeRanges
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeRangeDto)
  timeRanges: TimeRangeDto[];

  constructor() {
    this.title = '';
    this.timeRanges = [{
      id: Date.now().toString(),
      startTime: { hours: 9, minutes: 0 },
      endTime: { hours: 17, minutes: 0 }
    }];
  }

  static fullDayExample(): DayScheduleDto {
    const dto = new DayScheduleDto();
    Object.assign(dto, DayScheduleDto.examples.default);
    return dto;
  }

  static morningOnlyExample(): DayScheduleDto {
    const dto = new DayScheduleDto();
    Object.assign(dto, DayScheduleDto.examples.default);
    return dto;
  }

  static closedExample(): DayScheduleDto {
    const dto = new DayScheduleDto();
    Object.assign(dto, DayScheduleDto.examples.default);
    return dto;
  }
}
