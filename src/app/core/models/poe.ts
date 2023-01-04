export class Poe {
  private _id?: number;
  private _title: string = '';
  private _beginDate!: Date;
  private _endDate!: Date;
  private _poeType: any; // @todo use an enum instead of any

  /**
   * @usage const id = myObj.id
   */
  get id(): number | undefined {
    return this._id
  }


  set id(val: number | undefined) {
    this._id = val
  }

  get title() {
    return this._title
  }

  set title(val: string) {
    this._title = val
  }

  get beginDate() {
    return this._beginDate
  }

  set beginDate(val: Date) {
    this._beginDate = val
  }

  get endDate() {
    return this._endDate
  }

  set endDate(val: Date) {
    this._endDate = val
  }

  get poeType() {
    return this._poeType
  }

  set poeType(val: any) {
    this._poeType = val
  }


}
