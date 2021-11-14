import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  showBack: boolean = false;
  private ngUnsubscribeAll = new Subject();

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((ev) => ev instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribeAll)
      )
      .subscribe((event) => {
        const e = event as NavigationEnd;
        this.showBack = e.urlAfterRedirects != '/starships';
      });
  }

  handleGoBack(): void {
    if (['/', '/starships'].indexOf(this.location.path()) == -1) {
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeAll.next();
    this.ngUnsubscribeAll.complete();
  }
}
