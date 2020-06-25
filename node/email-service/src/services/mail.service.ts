import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from 'src/global/kafka/kafka.service';
import { KafkaPayload } from 'src/global/kafka/kafka.message';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {

  constructor(private kafkaService:KafkaService){}
    async onModuleInit() {
        await this.kafkaService.consumer.subscribe({ topic: 'email_events', fromBeginning: false });
        await this.kafkaService.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let payload: KafkaPayload<any> = JSON.parse(message.value.toString());
                console.log(message);
                console.log(message.value.toString())
                console.log(payload.cuerpo);
                this.enviarEmail(payload);
            },
        });
    }




    enviarEmail(data:KafkaPayload){
        console.log("por lo menos llega");
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'docker2019@vallegrande.edu.pe',
                pass: 'DockerServer_2019'
            }
        });
        smtpTransport.sendMail({
            from: "docker2019@vallegrande.edu.pe",
            to: data.cuerpo.email,
            subject: "emailData.subject",
            text: data.evento +' | '+ data.cuerpo.message,

        }, (error: any, response: any) => {
            if (error) {
                console.log('error');
                console.log(error);
            } else {
                console.log("Message sent: ", response);
            }
            smtpTransport.close();
        });

    }
  
}