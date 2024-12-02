import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class TimeDto {
  static readonly examples = {
    morning: {
      start: { hour: 9, minute: 0 },
      end: { hour: 13, minute: 0 }
    },
    evening: {
      start: { hour: 16, minute: 0 },
      end: { hour: 20, minute: 0 }
    }
  };

  @ApiProperty({
    description: 'Hour (0-23)',
    minimum: 0,
    maximum: 23,
    example: TimeDto.examples.morning.start.hour
  })
  @IsNumber()
  @Min(0)
  @Max(23)
  hour: number;

  @ApiProperty({
    description: 'Minute (0-59)',
    minimum: 0,
    maximum: 59,
    example: TimeDto.examples.morning.start.minute
  })
  @IsNumber()
  @Min(0)
  @Max(59)
  minute: number;

  constructor() {
    this.hour = 0;
    this.minute = 0;
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

  static example(): TimeDto {
    return TimeDto.startExample();
  }
}
