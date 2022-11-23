import { Pipe, PipeTransform } from '@angular/core';
import { StagiaireModel } from './../../core/models/stagiaire-model';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  private _transformParam: string = '';
  private _transformMap: Map<string, Function> = new Map<string, Function>([
    [
      '',
      () => InitialsPipe.simpleInitials()
    ],
    [
      'lastNameFirst',
      () => InitialsPipe.simpleInitialsInversed()
    ],
    [
      'full',
      () => InitialsPipe.simpleFullInitials()
    ],
    [
      'lastNameFirstFull',
      () => InitialsPipe.fullInitialsInversed()
    ]
  ]);
  private static stagiaire: StagiaireModel;

  transform(value: unknown, ...args: string[]): string {
    if (value instanceof StagiaireModel) {
      let dynamicFunction: Function | undefined;

      InitialsPipe.stagiaire = value;
      
      if (args.length) {
        this._transformParam = args[0];
        dynamicFunction = this._transformMap.get(this._transformParam);
        if (dynamicFunction !== undefined) {
          return dynamicFunction();
        } else {
          throw new Error(`Unable to find a resolver Function`);
        }
      } else {
        dynamicFunction = this._transformMap.get('');
        if (dynamicFunction !== undefined)
          return dynamicFunction();
        else
          throw new Error(`Could not load a Function for '' key`);
      }
    } else {
      throw new Error(`value is not a valid StagiaireModel Object`);
    }
  }

  private static simpleInitials(): string {
    return InitialsPipe.stagiaire.firstName.charAt(0) + InitialsPipe.stagiaire.lastName.charAt(0);
  }

  private static simpleInitialsInversed(): string {
    return InitialsPipe.stagiaire.lastName.charAt(0) + InitialsPipe.stagiaire.firstName.charAt(0);
  }

  private static simpleFullInitials(): string {
    let firstNameInitials: string;
    if (InitialsPipe.stagiaire.firstName.includes('-')) {
      firstNameInitials = InitialsPipe.stagiaire.firstName
        .split('-')
        .map((firstNamePart: string) => firstNamePart.charAt(0))
        .join('');
    } else {
      firstNameInitials = InitialsPipe.stagiaire.firstName.charAt(0);
    }
    return firstNameInitials + InitialsPipe.stagiaire.lastName.charAt(0);
  }

  private static fullInitialsInversed(): string {
    let firstNameInitials: string;
    if (InitialsPipe.stagiaire.firstName.includes('-')) {
      firstNameInitials = InitialsPipe.stagiaire.firstName
        .split('-')
        .map((firstNamePart: string) => firstNamePart.charAt(0))
        .join('');
    } else {
      firstNameInitials = InitialsPipe.stagiaire.firstName.charAt(0);
    }
    return InitialsPipe.stagiaire.lastName.charAt(0) + firstNameInitials;
  }
}
