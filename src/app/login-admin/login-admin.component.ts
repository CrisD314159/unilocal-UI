import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/login-dto';
import { Alerta } from '../../dto/alerta';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  loginDTO: LoginDTO;
  alerta:Alerta
  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.alerta = new Alerta("", "");
    this.loginDTO = new LoginDTO();
    
  }

  public login() {
    this.authService.loginAdmin(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.loginAdmin(data.respuesta.token);
      },
      error: error => {
      this.alerta = new Alerta(error.error.respuesta, "danger" );
      }
      });
  }

}
