import { HELP_DESK_API } from './../helpdesk.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${HELP_DESK_API}/api/auth`, user);
  }

  createOrUpdate(user: User): Observable<User[]> {
    if (user.id !== null && user.id !== '') {
      return this.http.put<User[]>(`${HELP_DESK_API}/api/user`, user);
    } else {
      user.id = null;
      return this.http.post<User[]>(`${HELP_DESK_API}/api/user`, user);
    }
  }

  findAll(page: number, count: number): Observable<User[]> {
    return this.http.get<User[]>(`${HELP_DESK_API}/api/user/${page}/${count}`);
  }

  findById(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${HELP_DESK_API}/api/user/${id}`);
  }

  delete(id: string): Observable<User[]> {
    return this.http.delete<User[]>(`${HELP_DESK_API}/api/user/${id}`);
  }

}
