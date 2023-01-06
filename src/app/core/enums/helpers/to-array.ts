export class ToArray {
  public static toArray(anEnum: any): any[] {
    return Object.keys(anEnum)
      .filter((value: any) => ToArray.isNumber(value))
      .map(key => anEnum[key]);
  }

  private static isNumber(value: any): boolean {
    return isNaN(Number(value)) === false;
  }
}
