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

  it(`Should return JA with second args`, () => {
    const pipe = new InitialsPipe();
    
    const stagiaire: StagiaireModel = new StagiaireModel();
    stagiaire.id = 6;
    stagiaire.lastName = 'aubert';
    stagiaire.firstName = 'jean';
    stagiaire.email = 'jean-luc.aubert@aelion.fr';
    stagiaire.phoneNumber = '06';
    stagiaire.gender = 'M';

    expect(pipe.transform(stagiaire, '', 'uppercase')).toBe('JA');
  });

  it(`Should return JLA if param contains full with a true value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, 'full')).toBe('JLA');
  });

  it(`Should return AJ if param contains lastNameFirst with a true value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, 'lastNameFirst')).toBe('AJ');
  });

  it(`Should return AJL if param contains full and lastNameFirst with a true value`, () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform(stagiaire, 'lastNameFirstFull')).toBe('AJL');
  });

  it(`Should throw an error if second param is dummy`, () => {
    const pipe = new InitialsPipe();
    expect(() => pipe.transform(stagiaire, 'truc')).toThrowError();
  });
});
