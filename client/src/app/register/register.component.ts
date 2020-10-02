import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    email: [],
    password: [],
    fName: [],
    lName: [],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
