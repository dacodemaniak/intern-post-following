import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ManageComponent } from './components/manage/manage.component';


@NgModule({
  imports: [RouterModule.forChild(PoesRoutingModule.routes)],
  exports: [RouterModule]
})
export class PoesRoutingModule {

  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: ListComponent
    },
    {
      path: 'add',
      component: ManageComponent
    },
    {
      path: 'update/:id',
      component: ManageComponent
    },
    {
      path: '**',
      redirectTo: 'list',
      pathMatch: 'full'
    }
  ]
}
