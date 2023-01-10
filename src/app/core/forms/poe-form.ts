import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Poe } from "../models/poe";
import { ControlType } from "./control-type";
import { Forms } from "./forms";

export class PoeForm extends Forms {
  private readonly controls: {[key: string]: AbstractControl} = {};

  private controlsMap: Map<string, ControlType> = new Map([
    ['title', {control: new FormControl(), validators: [Validators.required]}],
    ['beginDate', {control: new FormControl(), validators: [Validators.required]}],
    ['endDate', {control: new FormControl(), validators: [Validators.required]}],
    ['poeType', {control: new FormControl(), validators: [Validators.required]}]
  ]);

  public constructor(model: Poe) {
    super();
    this._model = model;
  }

  public build(): Forms {
    this._form = new FormGroup({});
    this.controlsMap.forEach((controlType: ControlType, name: string) => {
      controlType.control.setValue(this._model[name]);
      controlType.control.setValidators(controlType.validators);
      this._form.addControl(name, controlType.control);
    });
    return this;
  }
}
