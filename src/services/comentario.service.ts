import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ComentarioDTO } from '../dto/comentario-dto';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url = 'https://unilocal-backend.onrender.com/api/comentarios';
  constructor(
    private http: HttpClient
  ) { }

  public obtenerComentarios(codigoNegocio: string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.url}/obtener-comentarios/${codigoNegocio}`);
  }

  public agregar(comentario: ComentarioDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.url}/crear-comentario`, comentario);
  }
  public obtenerRating(negocio: string): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.url}/obtener-promedio/${negocio}`);
  }
}
