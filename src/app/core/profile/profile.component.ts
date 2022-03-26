import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public address = '';
  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  public save(): void {}

  public cancel(): void {}
}
