import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { TimeRangeDto } from './time-range.dto';

export class DailyOperatingHoursDto {
  static readonly examples = {
    fullDay: {
      ranges: [
        TimeRangeDto.examples.morning,
        TimeRangeDto.examples.evening
      ]
    },
    empty: {
      ranges: []
    }
  };

  @ApiProperty({ 
    type: [TimeRangeDto],
    description: 'Time ranges when the organization is open',
    example: DailyOperatingHoursDto.examples.fullDay.ranges
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeRangeDto)
  ranges: TimeRangeDto[];

  constructor() {
    this.ranges = [];
  }

  static example(): DailyOperatingHoursDto {
    const dto = new DailyOperatingHoursDto();
    dto.ranges = [
      Object.assign(new TimeRangeDto(), TimeRangeDto.examples.morning),
      Object.assign(new TimeRangeDto(), TimeRangeDto.examples.evening)
    ];
    return dto;
  }

  static emptyExample(): DailyOperatingHoursDto {
    return new DailyOperatingHoursDto();
  }
}
