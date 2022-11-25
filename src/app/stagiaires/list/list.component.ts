import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public stagiaires: StagiaireModel[] = [];

  public showLi: string = 'A';
  
  constructor(
    private router: Router, // DI => Dependency Injection
    private stagiaireService: StagiaireService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.stagiaireService.findAll()
      .subscribe((stagiaires: StagiaireModel[]) => {
        this.stagiaires = stagiaires;
      });
  }

  public changeGender(): void {
    if (this.showLi === 'M') {
      this.showLi = 'F';
    } else {
      this.showLi = 'M';
    }
  }

  public isShown(stagaire: any): boolean {
    if (this.showLi === 'A') {
      return true;
    }

    if (this.showLi === 'F') {
      return stagaire.gender === 'F';
    }

    return stagaire.gender === 'M';
  }

  public getDisplayRowsNumber(): number {
    if (this.showLi === 'A') {
      return this.stagiaires.length;
    }
    
    //return this.stagiaires.filter((stagiaire: any) => stagiaire.gender === this.showLi).length;

    // Avec un for of
    let displayedItem: number = 0;
    for (const stagiaire of this.stagiaires) {
      if (stagiaire.gender === this.showLi) {
        displayedItem += 1;
      }
    }
    return displayedItem;
  }

  public goToDetail(id: number): void {
    console.log(`Got ${id} from list`);
    this.router.navigate(['/detail', id]);
  }

  public onDelete(stagiaire: StagiaireModel): void {
    this.stagiaireService.delete(stagiaire)
      .subscribe((response: HttpResponse<any>) => {
        // Supprimer la ligne dans this.stagiaires
        this.stagiaires.splice(
          this.stagiaires.findIndex((obj: StagiaireModel) => obj.id === stagiaire.id),
          1
        );
        this.snackBar.open(
          `Le stagiaire ${stagiaire.id} a été supprimé`,
          'Compris',
          {
            duration: 2500
          }
        );
      })
  }
}
