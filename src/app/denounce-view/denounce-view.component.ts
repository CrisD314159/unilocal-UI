import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BusinessService } from '../../services/business.service';
import { ModeradorService } from '../../services/moderador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDenuncia } from '../../dto/item-denuncia';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-denounce-view',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, MatButtonModule],
  templateUrl: './denounce-view.component.html',
  styleUrl: './denounce-view.component.css'
})
export class DenounceViewComponent {
  denuncia:ItemDenuncia | undefined;
  codigoDenuncia: string =''
  nombreUsuario :string = ''
  nombrenegocio :string = ''
  constructor(private negocioService: BusinessService, private moderadorService: ModeradorService, private route: ActivatedRoute, private router: Router) {
   
    this.route.params.subscribe(params => {
      this.codigoDenuncia = params['id'];
      this.moderadorService.obtenerDenuncia(this.codigoDenuncia).subscribe({
        next: data => {
          this.denuncia = data.respuesta;
          this.getBusiness()
          this.getUser()
          
        },
        error: error => {
          console.log(error);
        }
      });
    });

    

   

   
  }

  public approveDenounce(id?: string) {
    this.moderadorService.aprobarDenuncia(this.codigoDenuncia).subscribe({
      next: data => {
        this.router.navigate(['/denounces-admin']);
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public getBusiness(){
    if(this.denuncia)
    this.negocioService.obtener(this.denuncia.idNegocio).subscribe({
      next: data => {
        this.nombrenegocio = data.respuesta.nombre;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  public getUser(){
    if(this.denuncia)
    this.negocioService.obtenerUsuario(this.denuncia.idUsuario).subscribe({
      next: data => {
        this.nombreUsuario = data.respuesta.nombre;
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public rejectDenounce(id?: string) {
    this.moderadorService.rechazarDenuncia(this.codigoDenuncia).subscribe({
      next: data => {
        this.router.navigate(['/denounces-admin']);
      },
      error: error => {
        console.log(error);
      }
    });

  }


}
