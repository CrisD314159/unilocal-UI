import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { DetalleusuarioDTO } from '../../dto/detalleusuario-dto';
import { CambioPasswordDTO } from '../../dto/cambio-password-dto';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInput],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  id:string = '';
  user: DetalleusuarioDTO = new DetalleusuarioDTO();
  cambioDTO: CambioPasswordDTO = new CambioPasswordDTO();
  error = false
  confirmedPassword: string = '';

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute, private negocioService: BusinessService){
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.clienteService.obtenerUsuario(this.id).subscribe({
      next: data => {
        this.user = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  public changePassword($event:any){
    $event.preventDefault();

    if(this.passwordMatch()){
      this.cambioDTO.idUsuario = this.id;
      this.cambioDTO.email = this.user.email;
      this.clienteService.restablecerContrasenia(this.cambioDTO).subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error: error => {
          console.log(error);
        }
      });
    }else{
      this.error = true;
    }
    
  }

  public passwordMatch(){
    return this.cambioDTO.passwordNuevo === this.confirmedPassword;
  }
  public handlePassword(event:any){
  
    this.cambioDTO.passwordNuevo = event.target.value;

    
  }

  public handleConfirmedPassword(event:any){
    this.confirmedPassword = event.target.value;
  }



}
