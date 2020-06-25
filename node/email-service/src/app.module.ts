import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './global/kafka/kafka.module';
import { EmailController } from './controllers/email';
import { MailService } from './services/mail.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController, EmailController],
  providers: [AppService, MailService],
})
export class AppModule {}
