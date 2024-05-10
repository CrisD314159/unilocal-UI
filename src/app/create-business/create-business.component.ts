import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../footer/footer.component';
import { MatSelectModule } from '@angular/material/select';
import { Horario } from '../../dto/horario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { BusinessService } from '../../services/business.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-create-business',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, GuestHeaderComponent, FooterComponent, MatSelectModule, FormsModule, CommonModule, RouterLink, MatIconModule],
  templateUrl: './create-business.component.html',
  styleUrl: './create-business.component.css'
})
export class CreateBusinessComponent {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  telefonos: string[];
  constructor(private negociosService: BusinessService, private mapaService: MapaService) {
  this.registroNegocioDTO = new RegistroNegocioDTO();
  this.horarios = [ new Horario() ];
  this.telefonos = [""];
  }
  public crearNegocio() {
  this.registroNegocioDTO.horarios = this.horarios;
  this.registroNegocioDTO.telefonos = this.telefonos;
  this.negociosService.crear(this.registroNegocioDTO);
  console.log(this.registroNegocioDTO);
  }
  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.telefonos.push("");
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

}
