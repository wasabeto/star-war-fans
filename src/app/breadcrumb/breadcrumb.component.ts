import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  showBack: boolean = false;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((ev) => ev instanceof NavigationEnd)).subscribe((event) => {
      const e = event as NavigationEnd;
      this.showBack = e.urlAfterRedirects != '/starships';
    });
  }

  handleGoBack(): void {
    if (['/', '/starships'].indexOf(this.location.path()) == -1) {
      this.location.back();
    }
  }
}
