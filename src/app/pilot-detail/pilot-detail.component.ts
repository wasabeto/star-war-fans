import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Pilot, Planet } from '../store/app.model';
import { selectPilotAllSelector } from '../store/pilot.selector';
import { selectPlanetAllSelector } from '../store/planet.selector';

@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.scss'],
})
export class PilotDetailComponent implements OnInit, OnDestroy {
  pilot?: Pilot;
  planet?: Planet;

  private subscriptions: Subscription[] = [];
  pilots$: Observable<readonly Pilot[]> = this.store.select(selectPilotAllSelector);
  planets$: Observable<readonly Planet[]> = this.store.select(selectPlanetAllSelector);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.subscriptions.push(
      this.pilots$.subscribe((pilots: readonly Pilot[]) => {
        this.pilot = pilots.find((p) => p.id == id);
        this.subscriptions.push(
          this.planets$.subscribe((planets: readonly Planet[]) => {
            this.planet = planets.find((pl) => pl.url == this.pilot?.homeworld);
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
