import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  isEditMode: boolean = false;
  userId: number | null = null;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      addresses: this.fb.array([])
    });
    // start with one empty address group
    this.addresses.push(this.createAddressGroup());
  }

  ngOnInit(): void {
    this.checkAuthentication();
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUserData(this.userId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkAuthentication(): void {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  private loadUserData(id: number): void {
    const user = this.userService.getUserById(id);
    if (user) {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      });
    }
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  get isFormValid(): boolean {
    return this.userForm.valid;
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.errorMessage = 'אנא בדוק את כל שדות הטופס';
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    setTimeout(() => {
      try {
        const formValue = this.userForm.value;

        if (this.isEditMode && this.userId) {
          this.userService.updateUser(this.userId, formValue);
          this.successMessage = 'משתמש עודכן בהצלחה!';
        } else {
          this.userService.addUser(formValue);
          this.successMessage = 'משתמש חדש נוסף בהצלחה!';
        }

        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 1500);
      } catch (error) {
        this.errorMessage = 'אירעה שגיאה בעת שמירת המידע';
        this.isSubmitting = false;
      }
    }, 500);
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  get pageTitle(): string {
    return this.isEditMode ? 'עריכת משתמש' : 'הוספת משתמש חדש';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'עדכן משתמש' : 'הוסף משתמש';
  }
}
