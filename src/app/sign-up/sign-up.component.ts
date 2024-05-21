import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { PublicoService } from '../../services/publico.service';
import { AuthService } from '../../services/auth.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../services/imagen.service';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, RouterLink, FormsModule, AlertaComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registroClienteDTO: RegistroClienteDTO;
  checkbox: boolean;
  alerta: Alerta;
  foto:any;
  constructor(private publicoService: PublicoService, private authService: AuthService, private imagenService: ImagenService, private router: Router) {
    this.alerta = new Alerta("", "");
    this.registroClienteDTO = new RegistroClienteDTO();
    this.checkbox = false;
  }

  public registrarCliente() {

    if (this.registroClienteDTO.fotoPerfil != "") {
      this.authService.registrarCliente(this.registroClienteDTO).subscribe({
      next: (data) => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.router.navigate(['/login']);
    },
      error: (error) => {
      this.alerta = new Alerta(error.error.respuesta, "danger");
    }
    });
    } else {
      this.alerta = new Alerta("Debe subir una imagen", "danger");
    }

  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmarPassword;
  }


  public checkboxChange() {
    this.checkbox = !this.checkbox;
  }

  public verifyCheckbox(): boolean {
    return this.checkbox;


  }
  public subirImagen() {
    if (this.foto != null) {
      const formData = new FormData();
      formData.append('file', this.foto);

      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.registroClienteDTO.fotoPerfil = data.respuesta.url;
          this.alerta = new Alerta("Se ha subido la foto", "success");
      },
        error: error => {
          console.log(error.error);
          this.alerta = new Alerta(error.error, "danger");
      }
      });
    } else {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
    }

  public getPhoto(event: any) {
    this.foto = event.target.files[0];
  }

}
