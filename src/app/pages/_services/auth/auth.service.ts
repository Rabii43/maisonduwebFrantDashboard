import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

// Method to log in a user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => response.user), // Retrieve only user info
      catchError((error) => {
        console.error('Login error:', error);
        return of(null); // Returns null in case of an error
      })
    );
  }

// Method to log out a user
  logout(): Observable<void> {
    return of();
  }

  // Check if the user is authenticated (e.g., logged in)
  isAuthenticated(): Observable<boolean> {
    return of(!!localStorage.getItem('token'));  // Example using a token stored in localStorage
  }

  getUserRole() {
    return (localStorage.getItem('token'))
  }
}
