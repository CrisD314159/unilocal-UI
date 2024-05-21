import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { MapaService } from '../../services/mapa.service';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [GuestHeaderComponent, FooterComponent, MatButtonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit{

  textoBusqueda: string;
  resultados: ItemNegocioDTO[];
  constructor(private route: ActivatedRoute, private negociosService: BusinessService, private mapaService: MapaService) {
    this.resultados = [];
    this.textoBusqueda = "";
    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];
      this.negociosService.buscar(this.textoBusqueda).subscribe({
      next: data => {
        this.resultados = data.respuesta;
        this.mapaService.pintarMarcadores(this.resultados);
      },
      error: error => {
        console.log(error);
      }
      })

    });
    }
  ngOnInit(): void {
    this.mapaService.crearMapa();
    
  }

}
