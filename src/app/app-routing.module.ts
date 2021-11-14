import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { StarshipComponent } from './starship/starship.component';

const routes: Routes = [
  {
    path: 'starships',
    component: StarshipComponent,
  },
  {
    path: 'starship/:id',
    component: StarshipDetailComponent,
  },
  {
    path: 'pilot/:id',
    component: PilotDetailComponent,
  },
  {
    path: '',
    redirectTo: '/starships',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
