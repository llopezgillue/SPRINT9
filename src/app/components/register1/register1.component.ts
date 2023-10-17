import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
 styleUrls: ['./register1.component.css']
})
export class Register1Component {
  isRegistered: boolean = true;
  formReg: FormGroup;
  isUserAlreadyRegistered: boolean = false;
  errorMessage: string = '';

  constructor(public userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(() => {
         this.router.navigate(['/welcome']);
      })
      .catch(error => {

      });
  }
}
