import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Pilot, Starship } from '../store/app.model';
import { selectPilotAllSelector } from '../store/pilot.selector';
import { selectStarshipAllSelector } from '../store/starship.selector';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss'],
})
export class StarshipDetailComponent implements OnInit {
  starship?: Starship;
  pilots?: Pilot[];

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.store.select(selectStarshipAllSelector).subscribe((starships: readonly Starship[]) => {
      this.starship = starships.find((s) => s.id! == id);
      const pilotList = this.starship?.pilots.map((p) => p.match(/\d+/)![0]);
      this.store
        .select(selectPilotAllSelector)
        .subscribe(
          (pilots: readonly Pilot[]) => (this.pilots = pilots.slice().filter((p) => pilotList!.indexOf(p.id) > -1))
        );
    });
  }

  pilotTrackFn = (i: number, pilot: Pilot) => pilot.id;
}
