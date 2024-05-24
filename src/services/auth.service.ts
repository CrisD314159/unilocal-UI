import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "https://unilocal-backend.onrender.com/api/auth";

  constructor(private http: HttpClient) { }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`https://unilocal-backend.onrender.com/api/sign-up/registrar-cliente`, cliente);
    }

    public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(`https://unilocal-backend.onrender.com/api/auth/login-cliente`, loginDTO);
    }

    public loginAdmin(loginDTO: LoginDTO): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(`${this.authURL}/login-moderador`, loginDTO);
    }
}
