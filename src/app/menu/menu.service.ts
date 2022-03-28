import { Menu, MenuItem } from '../models/menu';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { readMenusByURL } from './menu.db';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  public getMenu(): Observable<Menu> {
    // return this.http.get<Menu>(this.menuUrl);
    readMenusByURL('');
    return of(
      new Menu({
        items: [
          new MenuItem({ id: '1', imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 }),
          new MenuItem({ id: '2', imageUrl: './assets/dal.jpg', price: 10.99, description: 'Lentil Dal Curry', name: 'Dal Curry', available: 25 }),
          new MenuItem({ id: '3', imageUrl: './assets/naan.jpg', price: 4.99, description: 'Naan Bread', name: 'Naan', available: 25 })
        ]
      })
    );
  }

  public addMenuItem(item: MenuItem): void {}
}
