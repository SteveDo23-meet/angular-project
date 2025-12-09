import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent {
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  onEdit() { this.edit.emit(); }
  onRemove() { this.remove.emit(); }
}
