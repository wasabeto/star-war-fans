import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Pilot } from '../store/app.model';
import { selectPilotAllSelector } from '../store/pilot.selector';

@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.scss'],
})
export class PilotDetailComponent implements OnInit, OnDestroy {
  pilot?: Pilot;

  private subscriptions: Subscription[] = [];
  pilots$: Observable<readonly Pilot[]> = this.store.select(selectPilotAllSelector);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.subscriptions.push(
      this.pilots$.subscribe((pilots: readonly Pilot[]) => {
        this.pilot = pilots.find((p) => p.id == id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
