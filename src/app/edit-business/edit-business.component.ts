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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { TokenService } from '../../services/token.service';
import { Alerta } from '../../dto/alerta';
import { ImagenService } from '../../services/imagen.service';
import { AlertaComponent } from '../alerta/alerta.component';
import { ActualizarNegocioDTO } from '../../dto/actualizar-negocio-dto';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';

@Component({
  selector: 'app-edit-business',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, GuestHeaderComponent, FooterComponent, MatSelectModule, FormsModule, CommonModule, RouterLink, MatIconModule, AlertaComponent],
  templateUrl: './edit-business.component.html',
  styleUrl: './edit-business.component.css'
})
export class EditBusinessComponent {
  actualizarNegocioDTO: ActualizarNegocioDTO;
  negocio: ItemNegocioDTO = new ItemNegocioDTO();
  horarios: Horario[];
  telefonos: string[];
  fotos: any[];
  alerta:Alerta;
  codigoNegocio = '';
  constructor(private negociosService: BusinessService, private mapaService: MapaService, private tokenService: TokenService, private imagenService: ImagenService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.codigoNegocio = params['id'];
      this.negociosService.obtener(this.codigoNegocio).subscribe({
        next: data => {
          this.negocio = data.respuesta;
          this.telefonos = this.negocio.telefonos;
          this.horarios = this.negocio.horarios;
          this.mapaService.pintarMarcador(this.negocio);
          console.log(this.negocio);

        },
        error: error => {
          console.log(error.error);
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
      });
    });
    if(this.negocio){
      this.horarios = this.negocio.horarios;
      this.telefonos = this.negocio.telefonos;

    }else{
      this.horarios = [ new Horario() ];
      this.telefonos = [""];
    }
    this.alerta = new Alerta("", "");
    this.actualizarNegocioDTO = new ActualizarNegocioDTO();
    this.fotos = [];
  }
  public actualizaNegocio() {
    
    this.actualizarNegocioDTO.id = this.codigoNegocio;
    this.actualizarNegocioDTO.descripcion = this.negocio.descripcion;
    this.actualizarNegocioDTO.nombre = this.negocio.nombre;
    this.actualizarNegocioDTO.horarios = this.horarios;
    this.actualizarNegocioDTO.telefonos = this.telefonos;
    this.negociosService.actualizar(this.actualizarNegocioDTO).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.router.navigate(['/my-business']);
      },
      error: error => {
        console.log(error.error);
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    
    });

    

    
  }
  public agregarHorario() {
    this.horarios.push(new Horario());
    console.log(this.actualizarNegocioDTO);
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
            this.actualizarNegocioDTO.imagenes.push(data.respuesta.url);
            
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
    console.log(this.fotos);

  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.actualizarNegocioDTO.ubicacion.latitud = marcador.lat;
      this.actualizarNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

}
