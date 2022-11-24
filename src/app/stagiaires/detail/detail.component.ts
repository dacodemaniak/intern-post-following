import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StagiaireModel } from 'src/app/core/models/stagiaire-model';
import { StagiaireService } from 'src/app/core/services/stagiaire-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public stagiaire: StagiaireModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StagiaireService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (routeParams) => {
        console.log(`Detail got ${routeParams.get('id')}`);
        try {
          this.service.findOne(+routeParams.get('id')!)
            .subscribe((stagiaire: StagiaireModel) => {
              this.stagiaire = stagiaire;
            })
          console.log(JSON.stringify(this.stagiaire));
        } catch (error) {
          this.router.navigate(['/', 'stagiaires']);
        }
      }
    )
  }

}
