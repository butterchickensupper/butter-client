import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  @Output()
  public menuOpen = false;

  public menuClick(): void {
    this.menuOpen = !this.menuOpen;
  }

  public login(): void {
    this.router.navigate(['/login']);
  }
}
