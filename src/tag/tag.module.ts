import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module.js';
import { TagService } from './tag.service.js';
import { TagEntity } from './tag.entity.js';
import { TagController } from './tag.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), UserModule],
  providers: [TagService],
  controllers: [
    TagController
  ],
  exports: []
})
export class TagModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
  }
}
