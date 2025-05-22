import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import {
  MultipleDeviceNotificationDto,
  NotificationDto,
  TopicNotificationDto,
} from './dto/notification.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-notification')
  @ApiOperation({ summary: '단일 디바이스에 푸시 알림 전송' })
  @ApiResponse({ status: 200, description: '알림 전송 성공' })
  async sendNotification(@Body() body: NotificationDto) {
    return this.appService.sendNotification({
      token: body.token,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }

  @Post('send-multiple-notifications')
  @ApiOperation({ summary: '여러 디바이스에 푸시 알림 전송' })
  @ApiResponse({ status: 200, description: '알림 전송 성공' })
  async sendMultipleNotifications(@Body() body: MultipleDeviceNotificationDto) {
    return this.appService.sendNotificationToMultipleTokens({
      tokens: body.tokens,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }

  @Post('send-topic-notification')
  @ApiOperation({ summary: '토픽 구독자에게 푸시 알림 전송' })
  @ApiResponse({
    status: 200,
    description: '토픽 알림 전송 성공',
  })
  async sendTopicNotification(@Body() body: TopicNotificationDto) {
    return this.appService.sendTopicNotification({
      topic: body.topic,
      title: body.title,
      body: body.body,
      icon: body.icon,
    });
  }
}
