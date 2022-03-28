import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  public total = 0;

  constructor(public router: Router, private store: Store<IAppState>) {
    this.store.select('order').subscribe((res) => {
      this.total = 0;
      res.forEach((a) => {
        this.total += a.quantity;
      });
    });
  }

  @Output()
  public menuOpen = false;

  public menuClick(): void {
    this.menuOpen = !this.menuOpen;
  }

  public login(): void {
    this.router.navigate(['/profile']);
  }

  public cart(): void {
    this.router.navigate(['/cart']);
  }
}
