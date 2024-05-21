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
import { Router, RouterLink } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { TokenService } from '../../services/token.service';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../services/imagen.service';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-create-business',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, GuestHeaderComponent, FooterComponent, MatSelectModule, FormsModule, CommonModule, RouterLink, MatIconModule, AlertaComponent],
  templateUrl: './create-business.component.html',
  styleUrl: './create-business.component.css'
})
export class CreateBusinessComponent {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  telefonos: string[];
  fotos: any[];
  alerta:Alerta;
  constructor(private negociosService: BusinessService, private mapaService: MapaService, private tokenService: TokenService, private imagenService: ImagenService, private router: Router) {
    this.alerta = new Alerta("", "");
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [ new Horario() ];
    this.telefonos = [""];
    this.fotos = [];
  }
  public crearNegocio() {
    this.registroNegocioDTO.codigoCliente = this.tokenService.getCodigo();
    this.registroNegocioDTO.horarios = this.horarios;
    this.registroNegocioDTO.telefonos = this.telefonos;
    this.negociosService.crear(this.registroNegocioDTO).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.router.navigate(['/my-business']);
      },
      error: error => {
        console.log(error.error);
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    
    });
    console.log(this.registroNegocioDTO);
  }
  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.telefonos.push("");
  }

  public subirImagen() {
    if (this.fotos != null && this.fotos.length > 0) {
      this.fotos.forEach(foto =>{
        const formData = new FormData();
        formData.append('file', foto);

        this.imagenService.subir(formData).subscribe({
          next: data => {
            console.log(data.respuesta.url);
            this.registroNegocioDTO.imagenes.push(data.respuesta.url);
            
      },
        error: error => {
          console.log(error.error);
          this.alerta = new Alerta(error.error, "danger");
      }
      });

      })
      this.alerta = new Alerta("Se han subido todas las imagenes", "success");
      
    } else {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
    }

  public agregarImagenes(event:any){
  
    this.fotos.push(event.target.files[0]);

  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

}
