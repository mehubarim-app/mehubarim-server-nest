import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TimeDto } from './time.dto';
import { SWAGGER_EXAMPLES } from '../constants';

export class TimeRangeDto {
  @ApiProperty({ 
    description: 'Unique identifier (timestamp)',
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.timeRanges[0].id
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Start time',
    type: TimeDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.timeRanges[0].startTime
  })
  @ValidateNested()
  @Type(() => TimeDto)
  startTime: TimeDto;

  @ApiProperty({
    description: 'End time',
    type: TimeDto,
    example: SWAGGER_EXAMPLES.weeklySchedule.monday.timeRanges[0].endTime
  })
  @ValidateNested()
  @Type(() => TimeDto)
  endTime: TimeDto;

  constructor() {
    this.id = new Date().getTime().toString();
    this.startTime = new TimeDto();
    this.endTime = new TimeDto();
  }
}
