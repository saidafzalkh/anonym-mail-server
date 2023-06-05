import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';

@Module({
  providers: [MessengerService],
  controllers: [MessengerController],
})
export class MessengerModule {}
