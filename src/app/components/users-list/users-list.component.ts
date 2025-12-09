import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { UserItemComponent } from '../user-item/user-item.component';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, ReactiveFormsModule, SearchPipe, UserItemComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchControl = new FormControl('');
  loggedInUser: any = null;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkAuthentication(): void {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  private loadUsers(): void {
    this.userService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  addNewUser(): void {
    this.router.navigate(['/add-user']);
  }

  editUser(user: User): void {
    this.router.navigate(['/edit-user', user.id]);
  }

  deleteUser(id: number): void {
    if (confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      this.userService.deleteUser(id);
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  get usersCount(): number {
    return this.users.length;
  }
}
