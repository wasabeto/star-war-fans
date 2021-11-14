import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipComponent } from './starship.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectStarshipAllSelector } from '../store/starship.selector';
import { starshipList } from '../helpers/app.helper';
import { By } from '@angular/platform-browser';
import { Starship } from '../store/app.model';

describe('StarshipComponent', () => {
  let component: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;

  // Include a "MockStore" to test the store
  let store: MockStore<readonly Starship[]>;
  let mockStarshipSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [StarshipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StarshipComponent);
    component = fixture.componentInstance;

    // Use a fake selector to overwite the default and fill the data
    mockStarshipSelector = store.overrideSelector(selectStarshipAllSelector, starshipList);

    fixture.detectChanges();

    // Dispatch a fake call to load data from store
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a starship list', () => {
    expect(fixture.debugElement.queryAll(By.css('.starship')).length).toBe(1);
  });
});
