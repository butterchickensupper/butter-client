import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, MenuItem } from './models/menu';
import { Observable, of } from 'rxjs';

@Injectable()
export class MenuAgent {
  private menuUrl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  public getMenu(): Observable<Menu> {
    return of(new Menu({ items: [new MenuItem()] }));
    // return this.http.get<Menu>(this.menuUrl);
  }
}
