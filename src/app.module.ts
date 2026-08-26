import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';

const ormconfigPath = path.resolve(process.cwd(), 'ormconfig.json');
const ormconfig = fs.existsSync(ormconfigPath)
  ? JSON.parse(fs.readFileSync(ormconfigPath, 'utf8'))
  : {};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
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
  constructor(private readonly connection: Connection) {}
}
