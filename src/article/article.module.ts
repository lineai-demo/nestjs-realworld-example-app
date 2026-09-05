import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArticleController } from './article.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity.js';
import { Comment } from './comment.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { FollowsEntity } from '../profile/follows.entity.js';
import { ArticleService } from './article.service.js';
import { AuthMiddleware } from '../user/auth.middleware.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, Comment, UserEntity, FollowsEntity]), UserModule],
  providers: [ArticleService],
  controllers: [
    ArticleController
  ]
})
export class ArticleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'articles/feed', method: RequestMethod.GET},
        {path: 'articles', method: RequestMethod.POST},
        {path: 'articles/:slug', method: RequestMethod.DELETE},
        {path: 'articles/:slug', method: RequestMethod.PUT},
        {path: 'articles/:slug/comments', method: RequestMethod.POST},
        {path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE},
        {path: 'articles/:slug/favorite', method: RequestMethod.POST},
        {path: 'articles/:slug/favorite', method: RequestMethod.DELETE});
  }
}
