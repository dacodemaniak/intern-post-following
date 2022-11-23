import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/stagiaires/detail/detail.component';
import { ListComponent } from './pages/stagiaires/list/list.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '', // Chemin vide, doit toujours être la première route
      redirectTo: 'stagiaires',
      pathMatch: 'full' // Angular va analyser l'intégralité de la route
    },
    {
      path: 'stagiaires',
      component: ListComponent
    },
    {
      path: 'detail',
      component: DetailComponent
    },
    {
      path: '**', // Route fallback
      redirectTo: 'stagiaires',
      pathMatch: 'full'
    }
  ];
}

/**
 * /stagiaires/1
 * /stagiaires
 * 
 * URL : https://domaine.tld/location.html (L : Resouce Location => file)
 * URI : https://domaine.tld/home (I : Resource Identifier => code)
 * 
 * https://domaine.tld/stagiaires.php (Traitement côté serveur et retour JSON...)
 * ... a few moment later...
 * Ca implique que côté client vous refassiez TOUS vos appels (en remplçant au mieux
 *  stagiaires.php en stagiaires.py)
 * 
 * On travaille avec une URI (https://domaine.tld/stagiaires)
 */