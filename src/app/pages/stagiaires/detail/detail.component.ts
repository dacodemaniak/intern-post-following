import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (routeParams) => {
        console.log(`Detail got ${routeParams.get('id')}`);
        const service: StagiaireService  = new StagiaireService();
        service.deserialize(); // Génère le tableau des stagiaires dans le service
        try {
          this.stagiaire = service.findOne(+routeParams.get('id')!);
          console.log(JSON.stringify(this.stagiaire));
        } catch (error) {
          this.router.navigate(['/', 'stagiaires']);
        }
      }
    )
  }

}
