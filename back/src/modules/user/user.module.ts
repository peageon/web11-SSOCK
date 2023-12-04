import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballModule } from '../snowball/snowball.module';
import { JWTGuard } from '../../common/guards/jwt.guard';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
import { MessageEntity } from '../message/entity/message.entity';
import { SnowballService } from '../snowball/snowball.service';
import { MessageService } from '../message/message.service';
import { LetterEntity } from '../message/entity/letter.entity';
import { DecorationPrefixEntity } from '../snowball/entity/decoration-prefix.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SnowballEntity,
      MessageEntity,
      LetterEntity,
      DecorationPrefixEntity
    ]),
    SnowballModule
  ],
  controllers: [UserController],
  providers: [UserService, JWTGuard, SnowballService, MessageService]
})
export class UserModule {}
