import { IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class BookDto {

  @Type(() => String)
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @Type(() => Number)
  @Length(4, 4)
  publish!: number;
}

export class UpdateBook {
  title?: string;
  author?: string;
  publish?: number;
}


