import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  const stagiaire: StagiaireModel = new StagiaireModel();
  stagiaire.id = 6;
  stagiaire.lastName = 'Aubert';
  stagiaire.firstName = 'Jean-Luc';
  stagiaire.email = 'jean-luc.aubert@aelion.fr';
  stagiaire.phoneNumber = '06';
  stagiaire.gender = 'M';

  it('create an instance', () => {
    const pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it(`Should throw an Error if value is not a StagiaireModel`, () => {
    const pipe = new InitialsPipe();
    expect(() => pipe.transform('Not a valid object')).toThrowError();
  });

  it(`Should return JA`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire)).toBe('JA');
  });

  it(`Should return JLA if param contains full with a true value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, {full: true})).toBe('JLA');
  });

  it(`Should return JA if param contains full with a false value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, {full: false})).toBe('JA');
  });

  it(`Should return AJ if param contains lastNameFirst with a true value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, {lastNameFirst: true})).toBe('AJ');
  });

  it(`Should return JA if param contains lastNameFirst with a false value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, {lastNameFirst: false})).toBe('JA');
  });

  it(`Should return AJL if param contains full and lastNameFirst with a true value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, {lastNameFirst: true, full: true})).toBeTruthy();
  });
});
