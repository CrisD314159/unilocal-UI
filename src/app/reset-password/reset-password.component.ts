import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInput],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  error:boolean = false;
  email:string
  constructor(private clienteService: ClienteService, private router: Router) {
    this.email = "";

  }

  public resetPassword($event:any){
    $event.preventDefault();
    this.clienteService.enviarLink(this.email).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error: error => {
        this.error = true;
      }
    });
  }

  public handleChange(event:any){
    this.email = event.target.value;
  }

}
