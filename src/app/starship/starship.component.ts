import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Starship } from '../store/app.model';
import { selectStarshipAllSelector } from '../store/starship.selector';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
})
export class StarshipComponent implements OnInit {
  // Use the store to retrieve all starships
  starships$ = this.store.select(selectStarshipAllSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  starshipTrackFn = (i: number, starship: Starship) => starship.id;
}
