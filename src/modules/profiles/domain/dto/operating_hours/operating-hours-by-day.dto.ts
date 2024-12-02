import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DailyOperatingHoursDto } from './daily-operating-hours.dto';

export class OperatingHoursByDayDto {
  static readonly examples = {
    weeklyHours: {
      sunday: DailyOperatingHoursDto.examples.fullDay,
      monday: DailyOperatingHoursDto.examples.fullDay,
      tuesday: DailyOperatingHoursDto.examples.fullDay,
      wednesday: DailyOperatingHoursDto.examples.fullDay,
      thursday: DailyOperatingHoursDto.examples.fullDay,
      friday: DailyOperatingHoursDto.examples.fullDay,
      saturday: DailyOperatingHoursDto.examples.fullDay
    }
  };

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Sunday',
    example: OperatingHoursByDayDto.examples.weeklyHours.sunday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  sunday?: DailyOperatingHoursDto;

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Monday',
    example: OperatingHoursByDayDto.examples.weeklyHours.monday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  monday?: DailyOperatingHoursDto;

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Tuesday',
    example: OperatingHoursByDayDto.examples.weeklyHours.tuesday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  tuesday?: DailyOperatingHoursDto;

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Wednesday',
    example: OperatingHoursByDayDto.examples.weeklyHours.wednesday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  wednesday?: DailyOperatingHoursDto;

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Thursday',
    example: OperatingHoursByDayDto.examples.weeklyHours.thursday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  thursday?: DailyOperatingHoursDto;

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Friday',
    example: OperatingHoursByDayDto.examples.weeklyHours.friday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  friday?: DailyOperatingHoursDto;

  @ApiProperty({
    type: DailyOperatingHoursDto,
    description: 'Operating hours for Saturday',
    example: OperatingHoursByDayDto.examples.weeklyHours.saturday,
    required: false
  })
  @ValidateNested()
  @Type(() => DailyOperatingHoursDto)
  saturday?: DailyOperatingHoursDto;

  constructor() {
    // לא מאתחלים את הימים בקונסטרקטור כי הם אופציונליים
  }

  static example(): OperatingHoursByDayDto {
    const dto = new OperatingHoursByDayDto();
    dto.sunday = DailyOperatingHoursDto.example();
    dto.monday = DailyOperatingHoursDto.example();
    dto.tuesday = DailyOperatingHoursDto.example();
    dto.wednesday = DailyOperatingHoursDto.example();
    dto.thursday = DailyOperatingHoursDto.example();
    dto.friday = DailyOperatingHoursDto.example();
    dto.saturday = DailyOperatingHoursDto.example();
    return dto;
  }
}
