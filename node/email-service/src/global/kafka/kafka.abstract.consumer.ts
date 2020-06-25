import { OnModuleInit } from '@nestjs/common';

export abstract class AbstractKafkaConsumer implements OnModuleInit {
  protected abstract escucharEventos();

  public async onModuleInit(): Promise<void> {
    this.escucharEventos();
  }

}
