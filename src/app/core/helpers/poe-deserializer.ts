import { plainToInstance } from "class-transformer";
import { Deserializable } from "../interfaces/deserializable";
import { Poe } from "../models/poe";


export class PoeDeserializer implements Deserializable<Poe> {
  deserialize(rawDatas: any): Poe {
    return plainToInstance(Poe, rawDatas);
  }
}
