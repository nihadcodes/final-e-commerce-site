
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get isLoggedIn(): boolean {
    return this.authService.getUserRole() !== '';
  }

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.authService.setUserRole('');
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}
