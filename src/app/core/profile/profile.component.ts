import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('init');
  }

  public save(): void {}

  public cancel(): void {}
}
