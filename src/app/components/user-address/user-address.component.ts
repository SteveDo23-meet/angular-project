import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent {
  @Input() addresses: Array<any> | undefined;
}
