import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Pilot } from '../store/app.model';
import { selectPilotAllSelector } from '../store/pilot.selector';

@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.scss'],
})
export class PilotDetailComponent implements OnInit {
  pilot?: Pilot;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.store.select(selectPilotAllSelector).subscribe((pilots: readonly Pilot[]) => {
      this.pilot = pilots.find((p) => p.id == id);
    });
  }
}
