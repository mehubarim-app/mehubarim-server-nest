import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TimeRangeDto } from './time-range.dto';
import { SWAGGER_EXAMPLES } from '../constants';

export class DayScheduleDto {
  @ApiProperty({
    description: 'Title of the day',
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.title
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Time ranges for the day',
    type: [TimeRangeDto],
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.timeRanges
  })
  @ValidateNested({ each: true })
  @Type(() => TimeRangeDto)
  timeRanges: TimeRangeDto[];

  constructor() {
    this.title = '';
    this.timeRanges = [];
  }
}
