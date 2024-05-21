import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadorURl = "http://localhost:8080/api/moderadores";
  private negociosPrivateURL = "http://localhost:8080/api/lugares";
  private negociosPublicURL = "http://localhost:8080/api/public/lugares";
  private denunciaURL = "http://localhost:8080/api/denuncias";


  constructor(private http: HttpClient) {}

  public obtenerPendientes(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPrivateURL}/search/estado/ESPERA`);
  }
  public obtenerRechazados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPrivateURL}/search/estado/INACTIVO`);
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
