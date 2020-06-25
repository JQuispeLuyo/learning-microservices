export class KafkaPayload<T=any>{
  public cuerpo: T;
  public evento: string;

  create?(evento, cuerpo): KafkaPayload<T> {
    return {
      cuerpo,
      evento,
    };
  }
}
