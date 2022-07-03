import { Menu, MenuItem } from '../../models/menu';
import { Observable, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private menus?: Menu[] = undefined;

    constructor(private httpClient: HttpClient) {}

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

    public getMenuItem(id: string, itemId: string): Observable<MenuItem | undefined> {
        return this.getMenu(id).pipe(
            map((r) => {
                const index = r?.items.findIndex((a) => a.id === itemId);
                if (!index || index === -1) {
                    return undefined;
                }
                return r?.items[index];
            })
        );
    }
}
