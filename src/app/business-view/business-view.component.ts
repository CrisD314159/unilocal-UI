import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GuestHeaderComponent } from '../guest-header/guest-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MapaService } from '../../services/mapa.service';
import { Ubicacion } from '../../dto/ubicacion';
import { FavoritoDTO } from '../../dto/favorito-dto';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComentarioDTO } from '../../dto/comentario-dto';
import { ComentarioItem } from '../../dto/comentario-item';
import { MatSelectModule } from '@angular/material/select';
import { TokenService } from '../../services/token.service';
import { ComentarioService } from '../../services/comentario.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-business-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, GuestHeaderComponent, MatButtonModule, MatIconModule, RouterLink, MatInputModule, MatFormFieldModule, MatSelectModule, MatIcon],
  templateUrl: './business-view.component.html',
  styleUrl: './business-view.component.css'

})
export class BusinessViewComponent {

  codigoNegocio: string = '';
  negocio: ItemNegocioDTO | undefined;
  favorito:FavoritoDTO = new FavoritoDTO();
  userName: string = '';
  commentDTO: ComentarioDTO = new ComentarioDTO();
  comments: ComentarioItem[] = [];
  rating:string = '';

  constructor(private negocioService: BusinessService, private route: ActivatedRoute, private mapaService: MapaService, private tokenService: TokenService, private commentService: ComentarioService) {
    this.route.params.subscribe(params => {
      this.codigoNegocio = params['id'];
      this.negocioService.obtener(this.codigoNegocio).subscribe({
        next: data => {
          this.negocio = data.respuesta;
          this.mapaService.pintarMarcador(this.negocio);
          this.getRating();
          this.getUsername();
          this.obtenerComentarios();
        },
        error: error => {
          console.log(error);
        }
      })
     
    });
    
  }

  public getUsername(){
    if(this.negocio){
      console.log(this.negocio);
      this.negocioService.obtenerUsuario(this.negocio.nombreUsuario).subscribe({
        next: data => {
          this.userName = data.respuesta.nombre;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  public getRating(){
    if(this.negocio){
      this.commentService.obtenerRating(this.codigoNegocio).subscribe({
        next: data => {
          this.rating = data.respuesta;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  public agregarFavoritos(){
    if(this.negocio){
      this.favorito.idNegocio = this.negocio.codigoNegocio;
    }
    
    this
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcador(this.negocio);
  }

  trazarDireccion() {
    if(this.negocio){
       const destino = new Ubicacion(this.negocio.ubicacion.latitud, this.negocio.ubicacion.longitud);
       this.mapaService.establecerRuta(new Ubicacion(74.23223, -80.0928293), destino);
    }
  }

  public agregarComentario($event: any){
    $event.preventDefault();
    if(this.negocio){
      this.commentDTO.idNegocio = this.codigoNegocio;
      this.commentDTO.idUsuario = this.tokenService.getCodigo();
      this.commentService.agregar(this.commentDTO).subscribe({
        next: data => {
          this.obtenerComentarios();
          window.location.reload();
        },
        error: error => {
          console.log(error);
        }
      });

    }

  }

  public obtenerComentarios(){
      this.commentService.obtenerComentarios(this.codigoNegocio).subscribe({
        next: data => {
          this.comments = data.respuesta;
        },
        error: error => {
          console.log(error);
        }
      });
    
  }

  public handleChange(event: any){  
    this.commentDTO.contenido = event.target.value;
    console.log(this.commentDTO);
  }

  public handleRate(event: any){
    this.commentDTO.calificacion = event.value;
  }

  public handleTitle(event: any){
    this.commentDTO.titulo = event.target.value;
  }

}
