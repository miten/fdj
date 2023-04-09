import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class QueryTeamsDto {

  @IsString()
  @ApiProperty()
  readonly name: string
}
