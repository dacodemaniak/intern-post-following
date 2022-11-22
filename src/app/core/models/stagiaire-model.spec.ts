import { StagiaireModel } from './stagiaire-model';

describe('StagiaireModel', () => {
  
  it('should create an instance', () => {
    expect(new StagiaireModel()).toBeTruthy();
  });

  it(`Should have an '_id' property`, () => {
    const stagiaire: StagiaireModel = new StagiaireModel();

    let hasAnIdProperty: boolean = false;

    for (let property in stagiaire) {
      if (property === '_id') {
        hasAnIdProperty = true;
      }
    }

    expect(hasAnIdProperty).toBeTrue();
  });

  it(`Should return 0 when getId() method was invoked`, () => {
    const stagaire: StagiaireModel = new StagiaireModel();
    
    expect(stagaire.id).toEqual(0);
  });

  it(`Should have 'Aubert' as lastName`, () => {
    const stagaire: StagiaireModel = new StagiaireModel();
    stagaire.lastName = 'Aubert';

    expect(stagaire.lastName).toBe('Aubert');
  });
  
});
