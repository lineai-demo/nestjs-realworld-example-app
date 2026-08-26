import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { getTypeOrmConfig } from './orm-config.util';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule {
  constructor(private readonly dataSource: DataSource) {}
}
