import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.request';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
