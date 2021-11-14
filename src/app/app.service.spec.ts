import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Pilot, Starship } from './app.model';
import { AppService } from './app.service';
import { pilotList, starshipList } from './helpers/app.helper';

describe('AppService', () => {
  let service: AppService;
  let httpSpy: Spy<HttpClient>;
  let getStarshipAllFakeResponse = {
    results: starshipList,
  };
  let getStarshipPilotsFakeResponse: Pilot[] = pilotList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService, { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }],
    });
    service = TestBed.inject(AppService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // I'm testing this service only in the frontend rather than the API
  it('should return a list of spaceships and map the ID from the URL', (done: DoneFn) => {
    httpSpy.get.and.nextWith(getStarshipAllFakeResponse);

    service.getStarshipAll().subscribe((res) => {
      expect(res.results).toHaveSize(getStarshipAllFakeResponse.results.length);
      const s: Starship = res.results[0];
      const idFromUrl = getStarshipAllFakeResponse.results[0].url.match(/\d+/)![0];
      expect(s.id).toEqual(idFromUrl);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return a list of pilots and map the ID from the URL', (done: DoneFn) => {
    httpSpy.get.and.returnValues(getStarshipPilotsFakeResponse);

    service.getPilotsByUrl(['fakeURL']).subscribe((pilots: Pilot[]) => {
      expect(pilots).toHaveSize(getStarshipPilotsFakeResponse.length);
      const p: Pilot = pilots[0];
      const idFromUrl = getStarshipPilotsFakeResponse[0].url.match(/\d+/)![0];
      expect(p.id).toEqual(idFromUrl);
      done();
    }, done.fail);
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
