import { Component, OnInit } from '@angular/core';
import { Starship } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Star Wars fans';
  loading: boolean = true;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    let starships: Starship[] = [];
    // Subscribe to get all responses and build the Starship model
    this.appService.getStarshipAll().subscribe((res) => {
      starships = [...starships, ...res.results];
      if (starships.length == res.count) {
        console.log('All starships have been loaded...');
        this.loading = false;
      }
    });
  }
}
