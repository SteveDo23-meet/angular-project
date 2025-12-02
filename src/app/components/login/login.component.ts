import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'אנא בדוק את נתוני ההכנסה';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      const { username } = this.loginForm.value;
      this.userService.setLoggedInUser(username);
      this.isLoading = false;
      this.router.navigate(['/users']);
    }, 500);
  }

  get isFormValid(): boolean {
    return this.loginForm.valid;
  }
}
