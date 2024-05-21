import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { BusinessService } from '../../services/business.service';
import { ModeradorService } from '../../services/moderador.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ItemDenuncia } from '../../dto/item-denuncia';

  
@Component({
  selector: 'app-denounce-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, RouterLink],
  templateUrl: './denounce-admin.component.html',
  styleUrl: './denounce-admin.component.css'
})
export class DenounceAdminComponent {
  pendingDenounces: ItemDenuncia[] = [];
  rejectedDenounces: ItemDenuncia[] = [];


  constructor(private negocioService: BusinessService, private moderadorService: ModeradorService, private route: ActivatedRoute) {
    this.moderadorService.obtenerDenuncias().subscribe({
      next: data => {
        this.pendingDenounces = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public showPending(){
    this.rejectedDenounces = [];
    this.moderadorService.obtenerDenuncias().subscribe({
      next: data => {
        this.pendingDenounces = data.respuesta;
        window.location.reload();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public showRejected(){
    this.pendingDenounces = [];
    this.moderadorService.obtenerDenunciasRechazadas().subscribe({
      next: data => {
        this.rejectedDenounces = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public approveDenounce(id: string) {
    this.moderadorService.aprobarDenuncia(id).subscribe({
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

  public rejectDenounce(id: string) {
    this.moderadorService.rechazarDenuncia(id).subscribe({
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
