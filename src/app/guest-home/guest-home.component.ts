import { Component } from '@angular/core';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { MapaService } from '../../services/mapa.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { BusinessService } from '../../services/business.service';


@Component({
  selector: 'app-guest-home',
  standalone: true,
  imports: [GuestHeaderComponent, FooterComponent, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './guest-home.component.html',
  styleUrl: './guest-home.component.css'
})
export class GuestHomeComponent {
  bussiness: ItemNegocioDTO []
  constructor(private mapaService: MapaService, private router:Router, private negocioService: BusinessService) {
    this.bussiness = [];
    this.negocioService.listarNegocios().subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });



  }

  public mostrarRestaurantes(){
    this.negocioService.listarNegociosCategoria("RESTAURANTE").subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public mostrarBares(){
    this.negocioService.listarNegociosCategoria("BAR").subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public mostrarCafes(){
    this.negocioService.listarNegociosCategoria("CAFETERIA").subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public mostrarMuseos(){
    this.negocioService.listarNegociosCategoria("MUSEO").subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public mostrarHoteles(){
    this.negocioService.listarNegociosCategoria("HOTEL").subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });

  }
  public mostrarComidaRapida(){
    this.negocioService.listarNegociosCategoria("COMIDARAPIDA").subscribe({
      next: data => {
        console.log(data.respuesta);
        this.bussiness = data.respuesta;
        this.mapaService.pintarMarcadores(data.respuesta);
      },
      error: error => {
        console.log(error);
      }
    });

  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    
    }

  public iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
  }

}
