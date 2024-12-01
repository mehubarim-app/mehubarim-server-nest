import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { CreateTimeRangeDto } from './create-time-range.dto';

export class CreateOperatingHoursDto {
  @ApiProperty({ 
    enum: DayOfWeek,
    description: 'Day of the week',
    example: DayOfWeek.SUNDAY
  })
  @IsEnum(DayOfWeek)
  @IsNotEmpty()
  day: DayOfWeek;

  @ApiProperty({ 
    type: CreateTimeRangeDto,
    description: 'Operating hours time range'
  })
  @ValidateNested()
  @Type(() => CreateTimeRangeDto)
  @IsNotEmpty()
  timeRange: CreateTimeRangeDto;

  constructor() {
    this.day = DayOfWeek.SUNDAY;
    this.timeRange = new CreateTimeRangeDto();
  }
}
