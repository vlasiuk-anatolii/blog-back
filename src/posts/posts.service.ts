import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.request';
import { UpdatePostDto } from './dto/update-post.request';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    const updated = Object.assign(post, updatePostDto);
    return this.postRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
