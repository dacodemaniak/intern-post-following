import { StagiaireModel } from './stagiaire-model';

describe('StagiaireModel', () => {
  const properties: string[] = [
    '_id',
    '_lastname',
    '_firstname',
    '_gender',
    '_birthdate',
    '_phoneNumber',
    '_email',
  ];

  it('should create an instance', () => {
    expect(new StagiaireModel()).toBeTruthy();
  });

  it(`Should have 7 properties`, () => {
    const stagiaire: StagiaireModel = new StagiaireModel();

    let objectProperties: string[] = [];

    for (let property in stagiaire) {
      objectProperties.push(property);
    }

    expect(objectProperties.length).toBe(7);
  });

  it(`Should have ${properties} as properties`, () => {
    const stagiaire: StagiaireModel = new StagiaireModel();

    let objectProperties: string[] = [];

    for (let property in stagiaire) {
      objectProperties.push(property);
    }

    expect(objectProperties).toEqual(properties);
  });

  it(`Should return 0 when getId() method was invoked`, () => {
    const stagaire: StagiaireModel = new StagiaireModel();
    
    expect(stagaire.id).toEqual(0);
  });

  it(`Should have 'Aubert' as lastname`, () => {
    const stagaire: StagiaireModel = new StagiaireModel();
    stagaire.lastname = 'Aubert';

    expect(stagaire.lastname).toBe('Aubert');
  });

});
