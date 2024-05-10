import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MapaService } from '../../services/mapa.service';
import { Ubicacion } from '../../dto/ubicacion';
@Component({
  selector: 'app-business-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, GuestHeaderComponent, MatButtonModule, MatIconModule],
  templateUrl: './business-view.component.html',
  styleUrl: './business-view.component.css'
})
export class BusinessViewComponent {

  codigoNegocio: string = '';
  negocio: ItemNegocioDTO | undefined;

  constructor(private negocioService: BusinessService, private route: ActivatedRoute, private mapaService: MapaService) {
    this.route.params.subscribe(params => {
      this.codigoNegocio = params['id'];
      this.negocio = this.negocioService.obtener(this.codigoNegocio);
    });
    
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcador(this.negocio);
  }

  trazarDireccion() {
    if(this.negocio){
       const destino = new Ubicacion(this.negocio.ubicacion.latitud, this.negocio.ubicacion.longitud);
       this.mapaService.establecerRuta(new Ubicacion(74.23223, -80.0928293), destino);
    }
    }

}
