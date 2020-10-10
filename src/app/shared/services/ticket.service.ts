import { HELP_DESK_API } from './../helpdesk.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket): Observable<Ticket[]> {
    if (ticket.id !== null && ticket.id !== '') {
      return this.http.put<Ticket[]>(`${HELP_DESK_API}/api/ticket`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post<Ticket[]>(`${HELP_DESK_API}/api/ticket`, ticket);
    }
  }

  findAll(page: number, count: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id: string): Observable<Ticket[]> {
    return this.http.delete<Ticket[]>(`${HELP_DESK_API}/api/ticket/${id}`);
  }
}
