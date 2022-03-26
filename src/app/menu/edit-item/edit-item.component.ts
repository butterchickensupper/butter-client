import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  public form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    available: [0, Validators.min(1), Validators.required],
    ingredients: [''],
    nutrition: ['']
  });

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('init');
  }

  public onSave(): void {
    console.log(this.form.value);
  }
}
