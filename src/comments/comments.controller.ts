import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.request';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.commentsService.create(createCommentDto, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.commentsService.findAll();
  }
}
