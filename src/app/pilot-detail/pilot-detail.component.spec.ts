import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotDetailComponent } from './pilot-detail.component';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { pilotListOk } from '../helpers/app.helper';
import { selectPilotAllSelector } from '../store/pilot.selector';
import { By } from '@angular/platform-browser';
import { Pilot } from '../store/app.model';

describe('PilotDetailComponent', () => {
  let component: PilotDetailComponent;
  let fixture: ComponentFixture<PilotDetailComponent>;
  let store: MockStore<readonly Pilot[]>;
  let mockPilotSelector;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
      declarations: [PilotDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(PilotDetailComponent);
    component = fixture.componentInstance;
    mockPilotSelector = store.overrideSelector(selectPilotAllSelector, pilotListOk);

    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue(pilotListOk[0].id);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pilot name', () => {
    expect(fixture.debugElement.queryAll(By.css('.name')).length).toBe(1);
  });
});
