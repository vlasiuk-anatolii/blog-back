import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.request';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const commentData = {
      ...createCommentDto,
      author: { id: userId },
      post: { id: createCommentDto.postId },
    };
    const comment = this.commentRepository.create(commentData);
    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['author'] });
  }
}
