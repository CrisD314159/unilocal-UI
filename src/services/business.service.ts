import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import { Ubicacion } from '../dto/ubicacion';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ActualizarNegocioDTO } from '../dto/actualizar-negocio-dto';
import { DenounceDTO } from '../dto/denounce-dto';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private negociosPrivateURL = "http://localhost:8080/api/lugares";
  private negociosPublicURL = "http://localhost:8080/api/public/lugares";
  private clienteURL = "http://localhost:8080/api/clientes";
  private denunciaURL = "http://localhost:8080/api/denuncias";


  constructor(private http: HttpClient) {
 
  }
  public crear(negocioNuevo: RegistroNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosPrivateURL}/crear-lugar`, negocioNuevo);
  }

  public actualizar(actualizacionNegocio: ActualizarNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosPrivateURL}/actualizar-lugar`, actualizacionNegocio);
  }

  public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPublicURL}/buscar-lugar/${codigoNegocio}`);
  }
  
  public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosPrivateURL}/eliminar/${codigoNegocio}`);
  }

  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPublicURL}/usuario-lugares/${codigoCliente}`);
  }

  public buscar(argument: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPublicURL}/search/query/${argument}`);
  }

  public listarNegocios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPublicURL}/obtener-lugares`);
  }

  public archivar(id:string): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosPrivateURL}/archivar-lugar/${id}`, null);
  }

  public desarchivar(id:string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/republicar-negocio/${id}`, null);
  }

  public obtenerNegociosPendientes(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPrivateURL}/search/estado/ESPERA`);
  }

  public listarArchivados(id:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/obtener-archivados/${id}`);
  }

  public listarNegociosCategoria(categoria:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosPublicURL}/search/categoria/${categoria}`);
  }

  public obtenerUsuario(id:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/${id}`);
  }

  public denunciar(motivo:DenounceDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.denunciaURL}/crear-denuncia`, motivo);
  }
}

