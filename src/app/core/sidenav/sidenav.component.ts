import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            const el = document.querySelector('.mat-sidenav-content');
            if (!el) {
                return;
            }
            el.scrollTop = 0;
        });
    }

    @Input()
    public opened: boolean = false;
}
