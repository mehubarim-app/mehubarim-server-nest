import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class TimeDto {
  static readonly examples = {
    morning: {
      start: { hours: 9, minutes: 0 },
      end: { hours: 13, minutes: 0 }
    },
    evening: {
      start: { hours: 16, minutes: 0 },
      end: { hours: 20, minutes: 0 }
    }
  };

  @ApiProperty({
    description: 'Hours (0-23)',
    minimum: 0,
    maximum: 23,
    example: TimeDto.examples.morning.start.hours
  })
  @IsInt()
  @Min(0)
  @Max(23)
  hours: number;

  @ApiProperty({
    description: 'Minutes (0-59)',
    minimum: 0,
    maximum: 59,
    example: TimeDto.examples.morning.start.minutes
  })
  @IsInt()
  @Min(0)
  @Max(59)
  minutes: number;

  constructor() {
    this.hours = 0;
    this.minutes = 0;
  }

  static startExample(): TimeDto {
    const dto = new TimeDto();
    Object.assign(dto, TimeDto.examples.morning.start);
    return dto;
  }

  static endExample(): TimeDto {
    const dto = new TimeDto();
    Object.assign(dto, TimeDto.examples.morning.end);
    return dto;
  }
}
