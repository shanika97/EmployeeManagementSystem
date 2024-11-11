import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  id = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  username: string = '';
  password: string = '';
  currentid = '';
}
