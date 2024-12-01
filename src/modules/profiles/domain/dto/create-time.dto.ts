import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateTimeDto {
  @ApiProperty({ 
    description: 'Hour (0-23)',
    example: 9,
    minimum: 0,
    maximum: 23
  })
  @IsInt()
  @Min(0)
  @Max(23)
  @IsNotEmpty()
  hour: number;

  @ApiProperty({ 
    description: 'Minute (0-59)',
    example: 30,
    minimum: 0,
    maximum: 59
  })
  @IsInt()
  @Min(0)
  @Max(59)
  @IsNotEmpty()
  minute: number;

  constructor() {
    this.hour = 0;
    this.minute = 0;
  }
}
