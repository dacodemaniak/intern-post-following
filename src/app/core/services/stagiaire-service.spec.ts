import { StagiaireModel } from '../models/stagiaire-model';
import { StagiaireService } from './stagiaire-service';

describe('StagiaireService', () => {
  let service: StagiaireService;

  beforeEach(() => {
    service = new StagiaireService();
    service.deserialize();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it(`Should throw an error if id was not found`, () => {
    expect(() => service.findOne(12)).toThrowError();
  });

  it(`Should return 'Aubert' if id was 1`, () => {
    const stagiaire: StagiaireModel = service.findOne(1);
    expect(stagiaire.lastName).toBe('Aubert');
  })
});
