import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  ValidateIf,
  IsNumber,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @ValidateIf((o: CreateCommentDto) => o.avatarUrl !== '')
  @IsUrl()
  avatarUrl?: string;
}
