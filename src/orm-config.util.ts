import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { existsSync } from 'fs';
import { join } from 'path';
import { ArticleEntity } from './article/article.entity';
import { Comment } from './article/comment.entity';
import { FollowsEntity } from './profile/follows.entity';
import { TagEntity } from './tag/tag.entity';
import { UserEntity } from './user/user.entity';

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  const configPath = join(__dirname, '..', 'ormconfig.json');
  if (!existsSync(configPath)) {
    throw new Error(
      'ormconfig.json not found. Copy ormconfig.json.example to ormconfig.json and configure your database connection.'
    );
  }
  const config = require(configPath);
  return {
    ...config,
    // Reference entity classes directly rather than the glob string: typeorm 0.3+'s
    // stricter relation-metadata resolution requires the same class instance used by
    // TypeOrmModule.forFeature(), which a glob-based directory scan can't guarantee
    // under ts-jest's module registry.
    entities: [ArticleEntity, Comment, UserEntity, FollowsEntity, TagEntity],
  };
}
