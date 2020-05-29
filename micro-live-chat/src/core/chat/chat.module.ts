import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms/rooms.service';
import 'dotenv/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:5672`,
        exchanges: [
          {name: 'chat-message', type: 'fanout'}
        ]
      }),
    }),
  ],
  providers: [
    RoomsService
  ]
})

export class ChatModule {}