import { Component, OnInit } from '@angular/core';
import { Pilot, Starship } from './store/app.model';
import { AppService } from './app.service';
import { select, Store } from '@ngrx/store';
import { getStarshipAll } from './store/starship.action';
import { getPilotAll } from './store/pilot.action';
import { selectStarshipAllSelector } from './store/starship.selector';
import { selectPilotAllSelector } from './store/pilot.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Star Wars fans';
  loading: boolean = true;
  starships$ = this.store.select(selectStarshipAllSelector);
  pilots$ = this.store.select(selectPilotAllSelector);

  constructor(private appService: AppService, private store: Store) {}

  ngOnInit(): void {
    let starships: Starship[] = [];
    // Subscribe to get all responses and build the Starship list
    this.appService.getStarshipAll().subscribe((res) => {
      starships = [...starships, ...res.results];
      // Stop condition. Now all starships have been loaded
      if (starships.length == res.count) {
        // Get the pilot list in a separate array since a pilot can be in different starships
        // Load each pilot once
        let pilotUrlList: Array<string> = [];
        starships.forEach((s) => (pilotUrlList = [...pilotUrlList, ...s.pilots]));
        // Store the loaded starship using NgRx
        this.store.dispatch(getStarshipAll({ starships }));
        this.appService.getPilotsByUrl([...new Set(pilotUrlList)]).subscribe((pilots: Pilot[]) => {
          // Store the loaded pilots using NgRx
          this.store.dispatch(getPilotAll({ pilots }));
          this.loading = false;
        });
      }
    });
  }
}
