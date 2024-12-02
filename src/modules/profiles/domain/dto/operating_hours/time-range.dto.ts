import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TimeDto } from './time.dto';

export class TimeRangeDto {
  static readonly examples = {
    morning: {
      start: TimeDto.examples.morning.start,
      end: TimeDto.examples.morning.end
    },
    evening: {
      start: TimeDto.examples.evening.start,
      end: TimeDto.examples.evening.end
    }
  };

  @ApiProperty({
    type: TimeDto,
    description: 'Start time',
    example: TimeRangeDto.examples.morning.start
  })
  @ValidateNested()
  @Type(() => TimeDto)
  start: TimeDto;

  @ApiProperty({
    type: TimeDto,
    description: 'End time',
    example: TimeRangeDto.examples.morning.end
  })
  @ValidateNested()
  @Type(() => TimeDto)
  end: TimeDto;

  constructor() {
    this.start = new TimeDto();
    this.end = new TimeDto();
  }

  static example(): TimeRangeDto {
    const dto = new TimeRangeDto();
    Object.assign(dto.start, TimeDto.startExample());
    Object.assign(dto.end, TimeDto.endExample());
    return dto;
  }
}
