import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(): void {

    this.authService.signup(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); 
      },
      (error) => {
        console.error('Error during signup:', error);
      }
    );
  }
}
