import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Portfolio Overview',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/tables', title: 'Holdings & Transactions',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/icons', title: 'Watchlist',  icon:'ni-collection text-blue', class: '' },
    { path: '/maps', title: 'Market Overview',  icon:'ni-chart-bar-32 text-orange', class: '' },
    { path: '/reports', title: 'Reports & Analytics',  icon:'ni-single-copy-04 text-green', class: '' },
    { path: '/user-profile', title: 'Settings',  icon:'ni-settings-gear-65 text-yellow', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
