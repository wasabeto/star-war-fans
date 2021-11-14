import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, from, Observable, of } from 'rxjs';
import { catchError, expand, map } from 'rxjs/operators';
import { Pilot } from './store/app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  // I'm using the expand operator from RxJs to make a recursive call
  // using the [next] value from the response
  //
  //   {
  //     "count": 36,
  //     "next": "https://swapi.dev/api/starships/?page=2",
  //     "previous": null,
  //     "results": []
  //   }

  getStarshipAll(): Observable<any> {
    const getStarships = (url: string) =>
      from(
        this.http.get(url).pipe(
          // I'm mapping an ID for my Starship model from the [url] field
          // Routing purposes
          map((response: any) => {
            response.results.forEach((s: any) => (s.id = s.url.match(/\d+/)![0]));
            return response;
          })
        )
      );

    // While the response has a next value I'll expand the response to get more ersults
    return getStarships('https://swapi.dev/api/starships').pipe(
      expand((data: any) => {
        return data.next ? getStarships(data.next) : EMPTY;
      })
    );
  }

  // I'm using forkJoin operator to load all the pilot for once
  getPilotsByUrl(urlList: string[]): Observable<Pilot[]> {
    return forkJoin(urlList.map((url) => this.http.get<Pilot>(url))).pipe(
      map((response: Pilot[]) => {
        // I'm mapping an ID for my Pilot model from the [url] field
        // Routing purposes
        response.forEach((p) => (p.id = p.url.match(/\d+/)![0]));
        return response;
      }),
      catchError(() => of([]))
    );
  }
}
