import { FormGroup } from "@angular/forms";

export abstract class Forms {
  protected _form!: FormGroup;
  protected _model: any;

  get form(): FormGroup {
    return this._form;
  }
}
