import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginDTO } from '../../dto/login-dto';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Alerta } from '../../dto/alerta';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDTO: LoginDTO;
  alerta:Alerta
  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.alerta = new Alerta("", "");
    this.loginDTO = new LoginDTO();
    
  }

  public login() {
    this.authService.loginCliente(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.login(data.respuesta.token);
      },
      error: error => {
      this.alerta = new Alerta(error.error.respuesta, "danger" );
      }
      });
  }

}
