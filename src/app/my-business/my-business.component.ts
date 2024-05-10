import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { BusinessService } from '../../services/business.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-business',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, GuestHeaderComponent, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './my-business.component.html',
  styleUrl: './my-business.component.css'
})
export class MyBusinessComponent {
  negocios: ItemNegocioDTO[];
  constructor(private negocioService: BusinessService) {
  this.negocios = [];
  this.listarNegocios();
  }
  public listarNegocios(){
  this.negocios = this.negocioService.listar();
  }

  public deleteBusiness(id: string){
    this.negocioService.eliminar(id);
    this.negocios = this.negocioService.listar();
  }
}


