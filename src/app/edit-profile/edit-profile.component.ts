import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { ClienteService } from '../../services/cliente.service';
import { ImagenService } from '../../services/imagen.service';
import { TokenService } from '../../services/token.service';
import { DetalleusuarioDTO } from '../../dto/detalleusuario-dto';
import { ActualizarUsuarioDTO } from '../../dto/actualizar-usuario-dto';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatButtonModule, GuestHeaderComponent, FooterComponent, MatFormFieldModule, MatInputModule, RouterLink, MatSelectModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  usuario: DetalleusuarioDTO = new DetalleusuarioDTO();
  updateUserDTO: ActualizarUsuarioDTO = new ActualizarUsuarioDTO();
  foto:any;
  alerta:boolean = false;
  constructor(private router: Router, private negocioService: BusinessService, private route: ActivatedRoute, private tokenService: TokenService, private imagenService: ImagenService, private clienteService: ClienteService) {
    this.negocioService.obtenerUsuario(this.tokenService.getCodigo()).subscribe({
      next: data => {
        this.usuario = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  public updateUser($event: any) {
    $event.preventDefault();
    this.updateUserDTO.id = this.usuario.id;
    this.updateUserDTO.nombre = this.usuario.nombre;
    this.updateUserDTO.nickname = this.usuario.nickname;
    this.updateUserDTO.ciudadResidencia = this.usuario.ciudadResidencia;

    this.clienteService.actualizarUsuario(this.updateUserDTO).subscribe({
      next: data => {
        console.log(data.respuesta);
        this.router.navigate(['/my-profile']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public agregarImagen($event:any){
    this.foto = $event.target.files[0];

  }
  public subirImagen($event:any){
    $event.preventDefault();
    if (this.foto != null) {
      const formData = new FormData();
      formData.append('file', this.foto);

      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.updateUserDTO.fotoPerfil = data.respuesta.url;
          this.alerta = true;
        },
        error: error => {
          console.log(error.error);
          this.alerta = false;
        }
      });
    } else {
      this.alerta = false;
    }

  }
  public handleName($event:any){
    this.usuario.nombre = $event.target.value;
  }
  public handleCity($event:any){
    this.usuario.ciudadResidencia = $event.value;
  }
  public handleUser($event:any){
    this.usuario.nickname = $event.target.value;

  }

}
