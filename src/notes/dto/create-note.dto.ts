import { IsBoolean, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  favorite: boolean;

  @IsString()
  color_title: string;
}
