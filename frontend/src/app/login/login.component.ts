import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const { role } = response;
        this.authService.setUserRole(role);
        this.authService.setAuthStatus(true);
        if (role === 'admin') {
          this.router.navigate(['/products']);
        } else {
          this.router.navigate(['/home']);
        }

        this.email = '';
        this.password = '';
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }

  onLogout(): void {
    this.authService.logout().subscribe(
      (response) => {
        this.authService.setUserRole('');
        this.authService.setAuthStatus(false);
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }
}
