import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BusinessService } from '../../services/business.service';
import { ModeradorService } from '../../services/moderador.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../../services/mapa.service';


@Component({
  selector: 'app-business-view-admin',
  standalone: true,
  imports: [MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './business-view-admin.component.html',
  styleUrl: './business-view-admin.component.css'
})
export class BusinessViewAdminComponent {
  negocio: ItemNegocioDTO;
  negocioId: string = '';
  userName: string = '';

  constructor(private negocioService: BusinessService, private moderadorService: ModeradorService, private route: ActivatedRoute, private mapaService: MapaService) {
    
    this.negocio = new ItemNegocioDTO();
    this.route.params.subscribe(params => {
      this.negocioId = params['id'];
      this.moderadorService.obtener(this.negocioId).subscribe({
        next: data => {
          this.negocio = data.respuesta;
          this.mapaService.pintarMarcador(this.negocio);
          this.getUsername();
        },
        error: error => {
          console.log(error);
        }
      })
     
    });
    
    
  }

  public getUsername(){
    this.negocioService.obtenerUsuario(this.negocio.nombreUsuario).subscribe({
      next: data => {
        this.userName = data.respuesta.nombre;
      },
      error: error => {
        console.log(error);
      }
    });
  }


  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcador(this.negocio);
  }

}
