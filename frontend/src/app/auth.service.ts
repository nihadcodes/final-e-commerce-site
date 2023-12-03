import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/auth';
  private userRole: string = '';
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  authStatus = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      catchError(this.handleError)
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/signup`, body).pipe(
      catchError(this.handleError)
    );
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      catchError(this.handleError)
    );
  }

  setAuthStatus(status: boolean): void {
    this.authStatusSubject.next(status);
  }
  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Request failed:', error);
    return throwError(error);
  }
}
