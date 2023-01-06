import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { PoeTypes } from '../enums/poe-types';
export class Poe {
  private _id?: number;
  private _title: string = '';
  private _beginDate!: Date;
  private _endDate!: Date;
  private _poeType: PoeTypes = PoeTypes.POEI; // @todo use an enum instead of any

  /**
   * @usage const id = myObj.id
   */
  get id(): number | undefined {
    return this._id
  }

  @Expose()
  set id(val: number | undefined) {
    this._id = val
  }

  get title() {
    return this._title
  }

  @Expose()
  set title(val: string) {
    this._title = val
  }

  get beginDate() {
    return this._beginDate
  }

  @Expose()
  @Type(() => Date)
  set beginDate(val: Date) {
    this._beginDate = val
  }

  get endDate() {
    return this._endDate
  }

  @Expose()
  @Type(() => Date)
  set endDate(val: Date) {
    this._endDate = val
  }

  get poeType() {
    return this._poeType
  }

  @Expose()
  set poeType(val: any) {
    this._poeType = val
  }


}
