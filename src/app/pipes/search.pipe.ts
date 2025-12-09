import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(users: User[] | null, term: string | null): User[] {
    if (!users) return [];
    if (!term) return users;
    const t = term.trim().toLowerCase();
    return users.filter(u =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(t) ||
      (u.email || '').toLowerCase().includes(t) ||
      (u.phone || '').toLowerCase().includes(t)
    );
  }
}
