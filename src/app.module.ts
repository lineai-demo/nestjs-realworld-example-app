import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { ArticleModule } from './article/article.module.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProfileModule } from './profile/profile.module.js';
import { TagModule } from './tag/tag.module.js';

const ormconfigPath = path.resolve(process.cwd(), 'ormconfig.json');
const ormconfig = fs.existsSync(ormconfigPath)
  ? JSON.parse(fs.readFileSync(ormconfigPath, 'utf8'))
  : {};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
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
