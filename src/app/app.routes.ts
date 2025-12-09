import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'add-user', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent },
  { path: '**', redirectTo: 'login' }
];
