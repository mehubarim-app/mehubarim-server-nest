import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';
import { SWAGGER_EXAMPLES } from '../constants';

export class TimeDto {
  @ApiProperty({
    description: 'Hours (0-23)',
    minimum: 0,
    maximum: 23,
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.timeRanges[0].startTime.hours
  })
  @IsInt()
  @Min(0)
  @Max(23)
  hours: number;

  @ApiProperty({
    description: 'Minutes (0-59)',
    minimum: 0,
    maximum: 59,
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.timeRanges[0].startTime.minutes
  })
  @IsInt()
  @Min(0)
  @Max(59)
  minutes: number;

  constructor() {
    this.hours = 0;
    this.minutes = 0;
  }
}
