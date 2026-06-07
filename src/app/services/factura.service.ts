import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFactura(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  recalcular(id: number, nuevoSubtotal: number, tipoUsuario: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/recalcular`, {
      nuevoSubtotal,
      tipoUsuario
    });
  }
}