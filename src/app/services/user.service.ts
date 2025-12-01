import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users_data';
  private readonly LOGGED_IN_USER_KEY = 'logged_in_user';
  private usersSubject = new BehaviorSubject<User[]>(this.loadUsersFromStorage());
  public users$ = this.usersSubject.asObservable();

  constructor() {
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers(): void {
    if (this.loadUsersFromStorage().length === 0) {
      const defaultUsers: User[] = [
        new UserModel(1, 'ישראל', 'ישראלי', 'israel@example.com', '0501234567'),
        new UserModel(2, 'דניאל', 'כהן', 'daniel@example.com', '0502345678'),
        new UserModel(3, 'שרה', 'לוי', 'sarah@example.com', '0503456789')
      ];
      this.saveUsersToStorage(defaultUsers);
      this.usersSubject.next(defaultUsers);
    }
  }

  private loadUsersFromStorage(): User[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  getAllUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number): User | undefined {
    return this.loadUsersFromStorage().find(user => user.id === id);
  }

  addUser(user: Omit<User, 'id'>): void {
    const users = this.loadUsersFromStorage();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = new UserModel(newId, user.firstName, user.lastName, user.email, user.phone);
    users.push(newUser);
    this.saveUsersToStorage(users);
    this.usersSubject.next(users);
  }

  updateUser(id: number, updatedUser: Omit<User, 'id'>): void {
    const users = this.loadUsersFromStorage();
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { id, ...updatedUser };
      this.saveUsersToStorage(users);
      this.usersSubject.next(users);
    }
  }

  deleteUser(id: number): void {
    const users = this.loadUsersFromStorage().filter(user => user.id !== id);
    this.saveUsersToStorage(users);
    this.usersSubject.next(users);
  }

  setLoggedInUser(username: string): void {
    localStorage.setItem(this.LOGGED_IN_USER_KEY, JSON.stringify({ username, loginTime: new Date().toISOString() }));
  }

  getLoggedInUser(): any {
    const data = localStorage.getItem(this.LOGGED_IN_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN_USER_KEY) !== null;
  }

  logout(): void {
    localStorage.removeItem(this.LOGGED_IN_USER_KEY);
  }
}
