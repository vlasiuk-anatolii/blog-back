import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
