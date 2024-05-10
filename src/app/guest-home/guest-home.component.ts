import { Component } from '@angular/core';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { FooterComponent } from '../footer/footer.component';
import { MapaService } from '../../services/mapa.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-guest-home',
  standalone: true,
  imports: [GuestHeaderComponent, FooterComponent, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './guest-home.component.html',
  styleUrl: './guest-home.component.css'
})
export class GuestHomeComponent {
  constructor(private mapaService: MapaService, private router:Router) {}

  ngOnInit(): void {
    this.mapaService.crearMapa();
    }

  public iraBusqueda(valor:string){
    if(valor){
    this.router.navigate(["/busqueda", valor]);
    }
  }

}
