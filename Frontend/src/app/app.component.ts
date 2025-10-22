import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   isActive: boolean = false;

  toggleClass() {
    this.isActive = !this.isActive;
  }
}