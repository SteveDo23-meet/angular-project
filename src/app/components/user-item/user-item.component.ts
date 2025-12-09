import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { UserActionsComponent } from '../user-actions/user-actions.component';
import { UserAddressComponent } from '../user-address/user-address.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-item',
  imports: [CommonModule, UserAvatarComponent, UserActionsComponent, UserAddressComponent],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<number>();

  onEdit() { this.edit.emit(this.user); }
  onDelete() { this.remove.emit(this.user.id); }
}
