import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  active: boolean;
  profiles: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  profileIds: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.apiUrl}/${id}`);
  }

  createUser(request: CreateUserRequest): Observable<AdminUser> {
    return this.http.post<AdminUser>(this.apiUrl, request);
  }

  activateUser(id: string): Observable<AdminUser> {
    return this.http.put<AdminUser>(`${this.apiUrl}/${id}/activate`, null);
  }

  deactivateUser(id: string): Observable<AdminUser> {
    return this.http.put<AdminUser>(`${this.apiUrl}/${id}/deactivate`, null);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
