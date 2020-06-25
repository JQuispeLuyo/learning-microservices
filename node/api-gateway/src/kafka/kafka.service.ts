import { Consumer, Kafka, Producer } from 'kafkajs';
import { KafkaPayload } from './kafka.message';
import { default as config } from '../config/config';
class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  public consumer: Consumer;
  private static instance: KafkaService;
  constructor() {

    this.kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: [config.kafka.brokerIp],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: '1',
    });

    console.log("brokerIp");
    console.log(config.brokerIp);
    this.onModuleInit();
  }

  async onModuleInit(): Promise<void> {
    console.log("llego init");
    
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

  static getInstance(queue?: any) {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
    }
    return KafkaService.instance
  }
}

let KafkaConnect:any;
export default KafkaConnect = KafkaService.getInstance;
