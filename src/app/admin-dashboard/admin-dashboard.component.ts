import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { BusinessService } from '../../services/business.service';
import { RouterLink } from '@angular/router';
import { ModeradorService } from '../../services/moderador.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterLink, MatButtonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  pendingBusiness: ItemNegocioDTO[] = [];
  rejectedBusiness: ItemNegocioDTO[] = [];
  
  constructor(private negocioService: BusinessService, private moderadorService: ModeradorService) {
    this.moderadorService.obtenerPendientes().subscribe({
      next: data => {
        this.pendingBusiness = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public showPending(){
    this.rejectedBusiness = [];
    this.moderadorService.obtenerPendientes().subscribe({
      next: data => {
        this.pendingBusiness = data.respuesta;
        window.location.reload();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public showRejected(){
    this.pendingBusiness = [];
    this.moderadorService.obtenerRechazados().subscribe({
      next: data => {
        this.rejectedBusiness = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public approveBusiness(id: string) {
    this.moderadorService.aprobarNegocio(id).subscribe({
      next: data => {
        console.log(data);
        this.showPending
        window.location.reload();
        
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public rejectBusiness(id: string) {
    this.moderadorService.rechazarNegocio(id).subscribe({
      next: data => {
        console.log(data);
        this.showPending
        window.location.reload();
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
