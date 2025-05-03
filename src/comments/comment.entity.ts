import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user: User) => user.comments, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => Post, (post: Post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
