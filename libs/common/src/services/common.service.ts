import { ConfigService } from '@nestjs/config';
import {Injectable} from "@nestjs/common";
import {RmqContext, RmqOptions, Transport} from "@nestjs/microservices";
import * as TelegramApi from "node-telegram-bot-api";

@Injectable()
export class CommonService {
    constructor(private readonly configService: ConfigService) {}

    getRmqOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBITMQ_URI')],
                queue,
                noAck,
                persistent: true,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }

    acknowledgeMessage(context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();

        channel.ack(message)
    }

    async botStart(): Promise<any> {
        const telegramBot = new TelegramApi(this.configService.get<string>("TELEGRAM_TOKEN"),
            {polling: true})
        //const telegramBot = new TelegramApi(this.configService.get<string>("TELEGRAM_TOKEN"))
        //telegramBot.setWebHook('')
        return telegramBot
    };

    messageChatId(message: any) {
        return message.chat.id;
    };

    messageFrom(message: any) {
        return message.from;
    };

    messageText(message: any) {
        return message.text;
    };

    callBackData(query: any) {
        return query.data;
    };

    callBackQueryFrom(query: any) {
        return query.from
    };

    queryChatId(query: any) {
        return query.message.chat.id
    };
}