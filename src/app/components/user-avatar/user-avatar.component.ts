import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent {
  @Input() user!: User;

  get initials(): string {
    const f = this.user?.firstName || '';
    const l = this.user?.lastName || '';
    return (f.charAt(0) + (l.charAt(0) || '')).toUpperCase();
  }
}
