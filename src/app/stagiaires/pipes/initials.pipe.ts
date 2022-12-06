import { Pipe, PipeTransform } from '@angular/core';
import { StagiaireModel } from '../../core/models/stagiaire-model';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  private static _transformParam: any[] = [];

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
        InitialsPipe._transformParam = args;
        dynamicFunction = this._transformMap.get(InitialsPipe._transformParam[0]);
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
    const initials: string = InitialsPipe.stagiaire.firstname.charAt(0) 
          + InitialsPipe.stagiaire.lastname.charAt(0);
    if (InitialsPipe._transformParam[1] === 'uppercase') {
      return initials.toUpperCase();
    }
    return initials;
  }

  private static simpleInitialsInversed(): string {
    return InitialsPipe.stagiaire.lastname.charAt(0) + InitialsPipe.stagiaire.firstname.charAt(0);
  }

  private static simpleFullInitials(): string {
    let firstNameInitials: string;

    if (InitialsPipe.stagiaire.firstname.includes('-')) {
      firstNameInitials = InitialsPipe.stagiaire.firstname
        .split('-') // Transforme une chaîne en un tableau en découpant la chaîne sur le caractère spécifié
        // Si la chaîne est Jean-Luc => ['Jean', 'Luc']
        .map((firstNamePart: string) => firstNamePart.charAt(0)) // Transforme un tableau en un autre tableau
        // ['J', 'L']
        .join(''); // Génère une chaîne à partir d'un tableau (inverse du split) => JL
    } else {
      firstNameInitials = InitialsPipe.stagiaire.firstname.charAt(0);
    }
    return firstNameInitials + InitialsPipe.stagiaire.lastname.charAt(0);
  }

  private static fullInitialsInversed(): string {
    let firstNameInitials: string;
    if (InitialsPipe.stagiaire.firstname.includes('-')) {
      firstNameInitials = InitialsPipe.stagiaire.firstname
        .split('-')
        .map((firstNamePart: string) => firstNamePart.charAt(0))
        .join('');
    } else {
      firstNameInitials = InitialsPipe.stagiaire.firstname.charAt(0);
    }
    return InitialsPipe.stagiaire.lastname.charAt(0) + firstNameInitials;
  }
}
