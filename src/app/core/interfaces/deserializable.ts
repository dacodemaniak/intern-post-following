export interface Deserializable<T> {
  deserialize(rawDatas: any): T;
}
