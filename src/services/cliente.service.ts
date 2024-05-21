import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { CambioPasswordDTO } from '../dto/cambio-password-dto';
import { ActualizarUsuarioDTO } from '../dto/actualizar-usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clienteURL = "http://localhost:8080/api/clientes";
  private utilsURL = "http://localhost:8080/api/utils/recuperar";

  constructor(private http: HttpClient) { }

  public enviarLink(email: string) {
    return this.http.post(`${this.utilsURL}/enviar-link/${email}`, null);
  }

  //hacer el DTO
  public restablecerContrasenia(cambiarDTO: CambioPasswordDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.utilsURL}/cambiar-password`, cambiarDTO);
  }

  public obtenerUsuario(id:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.utilsURL}/get-cliente/${id}`);
  }

  public actualizarUsuario(actualizar:ActualizarUsuarioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.clienteURL}/actualizar-cliente`, actualizar);
  }


}
