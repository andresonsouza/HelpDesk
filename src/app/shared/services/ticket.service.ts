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

  findByParams(page: number, count: number, assignedToMe: boolean, t: Ticket): Observable<Ticket[]> {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title === '' ? 'uninformed' : t.title;
    t.status = t.status === '' ? 'uninformed' : t.status;
    t.priority = t.priority === '' ? 'uninformed' : t.priority;

    return this.http.get<Ticket[]>(`${HELP_DESK_API}/api/ticket/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assignedToMe}`);
  }
}
