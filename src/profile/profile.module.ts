import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { ProfileController } from './profile.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service.js';
import { UserModule } from '../user/user.module.js';
import {UserEntity} from "../user/user.entity.js";
import {FollowsEntity} from "./follows.entity.js";
import {AuthMiddleware} from "../user/auth.middleware.js";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowsEntity]), UserModule],
  providers: [ProfileService],
  controllers: [
    ProfileController
  ],
  exports: []
})
export class ProfileModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'profiles/:username/follow', method: RequestMethod.ALL});
  }
}
