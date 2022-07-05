import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Menu } from '../../models/menu';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private menus?: Menu[] = undefined;

    constructor(private httpClient: HttpClient) {
        const menu = localStorage.getItem('menu');
        if (menu) this.menus = JSON.parse(menu);
    }

    /**
     * Get all menus
     */
    public getMenus(): Observable<Menu[]> {
        if (this.menus) return of(this.menus);
        return this.httpClient.get<Menu[]>(environment.apiGatewayUrl + 'menu').pipe(
            map((m) => {
                m.forEach((a) => {
                    a.open = new Date(a.open);
                    a.close = new Date(a.close);
                });
                this.menus = m;
                localStorage.setItem('menu', JSON.stringify(m));
                return m;
            })
        );
    }

    public getMenu(id: string): Observable<Menu | undefined> {
        return this.getMenus().pipe(
            map((r) => {
                const i = r.findIndex((x) => x.id === id);
                if (i === -1) return undefined;
                return r[i];
            })
        );
    }
}
