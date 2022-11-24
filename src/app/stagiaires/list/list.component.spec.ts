import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { SharedModule } from 'src/app/shared/shared.module';
import { InitialsPipe } from 'src/app/stagiaires/pipes/initials.pipe';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let stagiaireService: StagiaireService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent, InitialsPipe ],
      imports: [ AppModule, RouterTestingModule, SharedModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    TestBed.inject(StagiaireService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
