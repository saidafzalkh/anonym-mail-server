import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { DtoUser } from './dto/dto.user';
import { DtoMessage } from './dto/dto.message';
import { DtoMessages } from './dto/dto.messages';

@Controller('messenger')
export class MessengerController {
  constructor(private messengerService: MessengerService) {}
  @Post('user')
  openUser(@Body() dto: DtoUser) {
    return this.messengerService.openUser(dto);
  }

  @Post('send')
  sendMessage(@Body() dto: DtoMessage) {
    return this.messengerService.sendMessage(dto);
  }

  @Get('messages')
  getMessages(@Query() dto: DtoMessages) {
    return this.messengerService.getMessages(dto);
  }

  @Get('users')
  getUsers() {
    return this.messengerService.getUsers();
  }
}
