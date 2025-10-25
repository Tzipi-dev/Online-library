import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
declare const google: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: { email: string } | null = null;
  googleClientId = environment.googleClientId;
  constructor(private ngZone: NgZone) {} // הזרקת NgZone

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }

    // הפונקציה שקוראים לה מה־callback של Google
    (window as any).handleCredentialResponse = (response: any) => {
      const user = this.parseJwt(response.credential);

      // ריצה בתוך Angular zone כדי שהUI יתעדכן
      this.ngZone.run(() => {
        this.currentUser = { email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      });
    };
  }

  toggleClass(section: string): void {
    console.log(`Clicked: ${section}`);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
