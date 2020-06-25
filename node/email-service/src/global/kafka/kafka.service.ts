import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { KafkaPayload } from './kafka.message';
import { default as config } from './../../config/config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  public consumer: Consumer;

  constructor() {

    this.kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: [config.kafka.brokerIp],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: '0',
    });

    console.log("brokerIp");
    console.log(config.kafka.brokerIp);
    
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
    //Probar conexion kafka :,v 
    const data = await this.consumer.describeGroup()
    console.log(data);
  }

  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  async connect() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage(kafkaTopic: string, kafkaMessage: KafkaPayload) {
    await this.producer.connect();
    const metadata = await this.producer
      .send({
        topic: kafkaTopic,
        messages: [{ value: JSON.stringify(kafkaMessage) }],
      })
      .catch(e => console.error(e.message, e));
    await this.producer.disconnect();
    return metadata;
  }
}
