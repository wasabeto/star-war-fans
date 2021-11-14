import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from './app.service';
import { Pilot, Planet, Starship } from './store/app.model';
import { getPilotAll } from './store/pilot.action';
import { getPlanetAll } from './store/planet.action';
import { getStarshipAll } from './store/starship.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Star Wars fans';
  loading: boolean = true;
  private ngUnsubscribeAll = new Subject();

  constructor(private appService: AppService, private store: Store) {}

  ngOnInit(): void {
    let starships: Starship[] = [];
    // Subscribe to get all responses and build the Starship list
    this.appService
      .getStarshipAll()
      .pipe(takeUntil(this.ngUnsubscribeAll))
      .subscribe((res) => {
        starships = [...starships, ...res.results];
        // Stop condition. Now all starships have been loaded
        if (starships.length == res.count) {
          // Get the pilot list in a separate array since a pilot can be in different starships
          // Load each pilot once
          let pilotUrlList: Array<string> = [];
          starships.forEach((s) => (pilotUrlList = [...pilotUrlList, ...s.pilots]));
          // Store the loaded starship using NgRx
          this.store.dispatch(getStarshipAll({ starships }));
          this.appService
            .getPilotsByUrl([...new Set(pilotUrlList)])
            .pipe(takeUntil(this.ngUnsubscribeAll))
            .subscribe((pilots: Pilot[]) => {
              // Get the planet list in a separate array since a same planet could be a homeworld of different pilots
              let planetUrlList: Array<string> = pilots.map((p) => p.homeworld);
              // Store the loaded pilots using NgRx
              this.store.dispatch(getPilotAll({ pilots }));
              this.appService
                .getPlanetsByUrl([...new Set(planetUrlList)])
                .pipe(takeUntil(this.ngUnsubscribeAll))
                .subscribe((planets: Planet[]) => {
                  // Store the loaded pilots using NgRx
                  this.store.dispatch(getPlanetAll({ planets }));
                  this.loading = false;
                });
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeAll.next();
    this.ngUnsubscribeAll.complete();
  }
}
