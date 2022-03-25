import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  @Input()
  public opened: boolean = false;
}
