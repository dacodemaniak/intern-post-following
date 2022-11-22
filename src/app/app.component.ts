import { Component } from '@angular/core';
import { StagiaireModel } from './core/models/stagiaire-model';
import { StagiaireService } from './core/services/stagiaire-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // View
  styleUrls: ['./app.component.scss'] // Tableau de SCSS pour la mise en forme
})
export class AppComponent {
  public title = 'frontend';

  public stagiaires: StagiaireModel[] = [];

  public showLi: string = 'M';

  public constructor() {
    const service: StagiaireService  = new StagiaireService();
    service.deserialize();
    this.stagiaires = service.getStagiaires();
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

}
