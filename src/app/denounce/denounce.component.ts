import { Component } from '@angular/core';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BusinessService } from '../../services/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ImagenService } from '../../services/imagen.service';
import { MapaService } from '../../services/mapa.service';
import { DenounceDTO } from '../../dto/denounce-dto';

@Component({
  selector: 'app-denounce',
  standalone: true,
  imports: [GuestHeaderComponent, FooterComponent, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './denounce.component.html',
  styleUrl: './denounce.component.css'
})
export class DenounceComponent {
  motivo:string = '';
  denuncia:DenounceDTO = new DenounceDTO();
  constructor(private negocioService: BusinessService, private router: Router, private tokenService: TokenService, private imagenService: ImagenService, private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.denuncia.idNegocio = params['id'];
    });

    
  }

  public denunciar($event:any) {
    $event.preventDefault();
    this.denuncia.idUsuario = this.tokenService.getCodigo();
    this.denuncia.motivo = this.motivo;
    this.negocioService.denunciar(this.denuncia).subscribe({
      next: data => {
        console.log(data.respuesta);
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public handleChange(event:any) {
    this.motivo = event.target.value;
  }

}
