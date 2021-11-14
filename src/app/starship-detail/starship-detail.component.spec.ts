import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StarshipDetailComponent} from './starship-detail.component';
import {ActivatedRoute} from "@angular/router";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {selectStarshipAllSelector} from "../store/starship.selector";
import {pilotListOk, starshipListOk} from "../helpers/app.helper";
import {selectPilotAllSelector} from "../store/pilot.selector";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import { Starship } from '../store/app.model';

describe('StarshipDetailComponent', () => {
  let component: StarshipDetailComponent;
  let fixture: ComponentFixture<StarshipDetailComponent>;
  let store: MockStore<readonly Starship[]>;
  let mockStarshipSelector;
  let mockPilotSelector;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideMockStore(),
      ],
      declarations: [StarshipDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(StarshipDetailComponent);
    component = fixture.componentInstance;
    mockStarshipSelector = store.overrideSelector(selectStarshipAllSelector, starshipListOk)
    mockPilotSelector = store.overrideSelector(selectPilotAllSelector, pilotListOk)

    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('12');
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the starship name', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.name')).length
    ).toBe(1);
  });

  it('should render a pilot list', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.pilots')).length
    ).toBe(1);
  });
});
