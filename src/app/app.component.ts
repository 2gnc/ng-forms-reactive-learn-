import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['test'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(
          null,
          [
            Validators.required,
            this.isNameForbidden
          ],
        ),
        'email': new FormControl(
          null,
          [
            Validators.required,
            Validators.email,
          ],
          this.isEmailForbidden
        ),
      }),
      'gender': new FormControl(this.genders[1]),
      'hobbies': new FormArray([])
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value)
    });

    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value)
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
  
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  get controls(): AbstractControl[] {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  isNameForbidden = (control: FormControl): {[s: string]: boolean} => {
    const isNameForbidden = this.forbiddenUsernames.some((forbidden) => forbidden === control.value);
    return isNameForbidden ? {
      'forbidden': true
    } : null;
  }

  isEmailForbidden(control:FormControl): Promise<{[s: string]: boolean}> | Observable<{[s: string]: boolean}> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          res({'emailInvalid': true})
        } else {
          res(null)
        }
      }, 3000);
    })
  }
}
