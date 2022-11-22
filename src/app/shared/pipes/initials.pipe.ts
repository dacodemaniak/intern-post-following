import { Pipe, PipeTransform } from '@angular/core';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  private _transformParam: any;

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value instanceof StagiaireModel) {
      if (args.length) {
        this._transformParam = args[0];
      }
      return this.getInitials(value).toUpperCase();
    } else {
      throw new Error(`value is not a valid StagiaireModel Object`);
    }
  }


  private getInitials(stagiaire: StagiaireModel): string {
    if (this._transformParam === undefined) {
      return this._firstNameHandling(stagiaire.firstName) + this._getInitial(stagiaire.lastName);
    }

    if (this._transformParam.hasOwnProperty('lastNameFirst') && this._transformParam.lastNameFirst) {
      return this._getInitial(stagiaire.lastName) + this._firstNameHandling(stagiaire.firstName);
    }

    return this._firstNameHandling(stagiaire.firstName) + this._getInitial(stagiaire.lastName);
  }

  private _firstNameHandling(firstName: string): string {
    if (this._transformParam === undefined) {
      return this._getInitial(firstName);
    }

    if (firstName.includes('-') && this._transformParam.hasOwnProperty('full') && this._transformParam.full) {
      const firstNameParts: string[] = firstName.split('-');
      return this._getInitial(firstNameParts[0]) + this._getInitial(firstNameParts[1]);
    }

    return this._getInitial(firstName);
  }

  private _getInitial(value: string): string {
    return value.charAt(0);
  }
}
