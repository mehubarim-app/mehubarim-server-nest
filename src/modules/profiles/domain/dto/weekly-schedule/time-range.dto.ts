import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TimeDto } from './time.dto';

export class TimeRangeDto {
  static readonly examples = {
    default: {
      id: '1702347600000',
      startTime: { hours: 9, minutes: 0 },
      endTime: { hours: 17, minutes: 0 }
    }
  };

  @ApiProperty({ 
    description: 'Unique identifier (timestamp)',
    example: TimeRangeDto.examples.default.id
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Start time',
    type: TimeDto,
    example: TimeRangeDto.examples.default.startTime
  })
  @ValidateNested()
  @Type(() => TimeDto)
  startTime: TimeDto;

  @ApiProperty({
    description: 'End time',
    type: TimeDto,
    example: TimeRangeDto.examples.default.endTime
  })
  @ValidateNested()
  @Type(() => TimeDto)
  endTime: TimeDto;

  constructor() {
    this.id = '';
    this.startTime = new TimeDto();
    this.endTime = new TimeDto();
  }

  static example(): TimeRangeDto {
    const dto = new TimeRangeDto();
    Object.assign(dto, TimeRangeDto.examples.default);
    return dto;
  }
}
