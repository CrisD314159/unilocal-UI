import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  registroClienteDTO: RegistroClienteDTO;
  checkbox: boolean;
  constructor() {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.checkbox = false;
  }

  public registrarCliente() {
    console.log(this.registroClienteDTO);

  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmarPassword;
    }


  public checkboxChange() {
    this.checkbox = !this.checkbox;
  }

  public verifyCheckbox(): boolean {
    return this.checkbox;


  }

}
