import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { pilotReducer } from './store/pilot.reducer';
import { starshipReducer } from './store/starship.reducer';
import { StarshipComponent } from './starship/starship.component';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { planetReducer } from './store/planet.reducer';

@NgModule({
  declarations: [AppComponent, StarshipComponent, StarshipDetailComponent, PilotDetailComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      starships: starshipReducer,
      pilots: pilotReducer,
      planets: planetReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
