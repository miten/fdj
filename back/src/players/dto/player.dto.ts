import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsString} from 'class-validator';


export class CreatePlayerDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly position: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly thumbnail: string


  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly born: Date

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly team: string

}
