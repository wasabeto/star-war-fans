import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Pilot, Starship } from '../store/app.model';
import { selectPilotAllSelector } from '../store/pilot.selector';
import { selectStarshipAllSelector } from '../store/starship.selector';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss'],
})
export class StarshipDetailComponent implements OnInit, OnDestroy {
  starship?: Starship;
  pilots?: Pilot[];

  private subscriptions: Subscription[] = [];
  starships$: Observable<readonly Starship[]> = this.store.select(selectStarshipAllSelector);
  pilots$: Observable<readonly Pilot[]> = this.store.select(selectPilotAllSelector);

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.subscriptions.push(
      this.starships$.subscribe((starships: readonly Starship[]) => {
        this.starship = starships.find((s) => s.id! == id);
        const pilotList = this.starship?.pilots.map((p) => p.match(/\d+/)![0]);
        this.subscriptions.push(
          this.pilots$.subscribe(
            (pilots: readonly Pilot[]) => (this.pilots = pilots.slice().filter((p) => pilotList!.indexOf(p.id) > -1))
          )
        );
      })
    );
  }

  pilotTrackFn = (i: number, pilot: Pilot) => pilot.id;

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
