import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { CreateTimeDto } from './create-time.dto';

export class CreateTimeRangeDto {
  @ApiProperty({ 
    type: CreateTimeDto,
    description: 'Start time'
  })
  @ValidateNested()
  @Type(() => CreateTimeDto)
  @IsNotEmpty()
  start: CreateTimeDto;

  @ApiProperty({ 
    type: CreateTimeDto,
    description: 'End time'
  })
  @ValidateNested()
  @Type(() => CreateTimeDto)
  @IsNotEmpty()
  end: CreateTimeDto;

  constructor() {
    this.start = new CreateTimeDto();
    this.end = new CreateTimeDto();
  }
}
