import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public adminMode = false;
  public menu: Menu = { description: '' };

  constructor() {}

  ngOnInit(): void {}
}
