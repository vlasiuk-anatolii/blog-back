import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.request';
import { UpdatePostDto } from './dto/update-post.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    const post = await this.postsService.findOne(+id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return this.postsService.remove(+id);
  }
}
