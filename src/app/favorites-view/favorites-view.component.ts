import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { BusinessService } from '../../services/business.service';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { TokenService } from '../../services/token.service';
import { ClienteService } from '../../services/cliente.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-view',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, GuestHeaderComponent, FooterComponent, RouterLink],
  templateUrl: './favorites-view.component.html',
  styleUrl: './favorites-view.component.css'
})
export class FavoritesViewComponent {
  favorites: ItemNegocioDTO[] = [];
  constructor(private negocioService: BusinessService, private route: ActivatedRoute, private mapaService: MapaService, private tokenService: TokenService, private clienteService: ClienteService) {
    this.clienteService.obtenerFavoritos(this.tokenService.getCodigo()).subscribe({
      next: data => {
        this.favorites = data.respuesta;
        console.log(this.favorites);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  public quitarFavoritos(codigoNegocio: string) {
      this.clienteService.quitarFavorito(this.tokenService.getCodigo(), codigoNegocio).subscribe({
        next: data => {
          console.log(data);
          window.location.reload();
        },
        error: error => {
          console.log(error);
        }
      });
    
  }

}
