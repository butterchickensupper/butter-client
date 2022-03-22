import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {}

  public menuOpen = false;

  public menuClick(): void {
    this.menuOpen = !this.menuOpen;
  }

  public login(): void {
    this.router.navigate(['/login']);
  }
}
