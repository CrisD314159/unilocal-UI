import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../footer/footer.component';
import { TokenService } from '../../services/token.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-guest-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, FooterComponent],
  templateUrl: './guest-header.component.html',
  styleUrl: './guest-header.component.css'
})
export class GuestHeaderComponent {
  isLogged =false
  email=""
  constructor(private tokenService: TokenService) {}
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
  if (this.isLogged) {
    this.email = this.tokenService.getEmail();
  }

  }
  public logout() {
    this.tokenService.logout();
  }

}
