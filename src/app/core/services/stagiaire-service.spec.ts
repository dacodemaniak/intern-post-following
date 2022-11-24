import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { StagiaireModel } from '../models/stagiaire-model';
import { StagiaireService } from './stagiaire-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { doesNotReject } from 'assert';
import { environment } from 'src/environments/environment';

describe('StagiaireService', () => {
  let httpClient: HttpClient;
  let service: StagiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          SharedModule,
          HttpClientTestingModule
        ],
        providers: [
          HttpClient
        ]
      }
    )
    httpClient = TestBed.inject(HttpClient);
    service = new StagiaireService(httpClient);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it(`Should return an Observable of a StagiaireModel array`, () => {
    const httpTestingController = TestBed.inject(HttpTestingController)
    service.findAll()
      .subscribe((stagiaires: StagiaireModel[]) => {
        expect(stagiaires).toBeInstanceOf(Array);
      });
    
    const request = httpTestingController.expectOne(
      `${environment.fakeApi}stagiaires`
    );

    expect(request.request.method).toBe('GET');
    httpTestingController.verify();
  });

  it(`Should return 'Aubert' as id passed is 1`, () => {
    const httpTestingController = TestBed.inject(HttpTestingController)
    service.findOne(1)
      .subscribe((stagiaire: StagiaireModel) => {
        expect(stagiaire.lastName).toBe('Aubert');
      });
    
    const request = httpTestingController.expectOne(
      `${environment.fakeApi}stagiaires/1`
    );

    expect(request.request.method).toBe('GET');
    httpTestingController.verify();
  });
});
