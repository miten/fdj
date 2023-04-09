import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class QueryPlayersDto {
  @IsString()
  @ApiProperty()
  readonly name: string
}
