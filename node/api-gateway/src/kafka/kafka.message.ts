export class KafkaPayload<T=any>{
  public cuerpo: T;
  public evento: string;

  create?(evento:any, cuerpo:any): KafkaPayload<T> {
    return {
      cuerpo,
      evento,
    };
  }
}
