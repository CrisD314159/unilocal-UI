import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadorURl = "https://unilocal-backend.onrender.com/api/moderadores";
  private negociosPrivateURL = "https://unilocal-backend.onrender.com/api/lugares";
  private negociosPublicURL = "https://unilocal-backend.onrender.com/api/public/lugares";
  private denunciaURL = "https://unilocal-backend.onrender.com/api/denuncias";


  constructor(private http: HttpClient) {}

  public obtenerPendientes(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPrivateURL}/search/estado/ESPERA`);
  }
  public obtenerRechazados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPrivateURL}/search/estado/RECHAZADO`);
  }
  public aprobarNegocio(id:string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.moderadorURl}/aprobar-lugar/${id}`, null);
  }
  public rechazarNegocio(id:string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.moderadorURl}/rechazar-lugar/${id}`, null);
  }

  public obtener(id:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPrivateURL}/moderator/get-place/${id}`);
  }
  public obtenerDenuncias(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.denunciaURL}/obtener-denuncias`);
  }

  public obtenerDenunciasRechazadas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.denunciaURL}/obtener-denuncias-rechazadas`);
  }

  public obtenerDenuncia(id:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.denunciaURL}/obtener-denuncia/${id}`);
  }

  public aprobarDenuncia(id:string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.denunciaURL}/aceptar-denuncia/${id}`, null);
  }
  public rechazarDenuncia(id:string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.denunciaURL}/rechazar-denuncia/${id}`, null);
  }

}
