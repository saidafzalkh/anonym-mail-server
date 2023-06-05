import { Injectable } from '@nestjs/common';
import { DtoUser } from './dto/dto.user';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoMessage } from './dto/dto.message';
import { DtoMessages } from './dto/dto.messages';

@Injectable()
export class MessengerService {
  constructor(private prisma: PrismaService) {}
  async openUser(dto: DtoUser) {
    const user = await this.prisma.user.findUnique({
      where: { name: dto.name },
    });
    if (user) {
      if (user.status === 'GHOST') {
        const newUser = await this.prisma.user.update({
          where: { name: user.name },
          data: { status: 'USER' },
        });
        return { user: newUser, new: true };
      }
      return { user, new: false };
    }
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
      },
    });
    return { user: newUser, new: true };
  }

  async sendMessage(dto: DtoMessage) {
    const user = await this.prisma.user.findUnique({
      where: { name: dto.recipient },
    });
    if (user) {
      const message = await this.prisma.message.create({
        data: {
          body: dto.body,
          title: dto.title,
          senderName: dto.sender,
          recipientName: dto.recipient,
        },
      });
      return { message, ghost: false };
    }
    await this.prisma.user.create({
      data: { name: dto.recipient, status: 'GHOST' },
    });
    const message = await this.prisma.message.create({
      data: {
        body: dto.body,
        title: dto.title,
        senderName: dto.sender,
        recipientName: dto.recipient,
      },
    });
    return { message, ghost: true };
  }

  async getMessages(dto: DtoMessages) {
    const messages = await this.prisma.message.findMany({
      where: { recipientName: dto.name },
    });
    return { messages };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      where: { status: 'USER' },
      select: { name: true, id: true },
    });
    return { users };
  }
}
