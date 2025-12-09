import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGGED_IN_USER_KEY = 'logged_in_user';

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
