import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { BusinessService } from '../../services/business.service';
import { MapaService } from '../../services/mapa.service';
import { TokenService } from '../../services/token.service';
import { ImagenService } from '../../services/imagen.service';
import { Router } from '@angular/router';
import { DetalleusuarioDTO } from '../../dto/detalleusuario-dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MatButtonModule, GuestHeaderComponent, FooterComponent, RouterLink],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  usuario: DetalleusuarioDTO;

  constructor(private negociosService: BusinessService, private mapaService: MapaService, private tokenService: TokenService, private imagenService: ImagenService, private router: Router) {
    this.usuario = new DetalleusuarioDTO();
    this.negociosService.obtenerUsuario(this.tokenService.getCodigo()).subscribe({
      next: data => {
        this.usuario = data.respuesta;
        console.log(this.usuario);
      },
      error: error => {
        console.log(error);
      }
    });
      
  }

  public deleteProfile(id:string){
    //this.negociosService.eliminarUsuario(id);
    this.router.navigate(['/']);
  }

}
