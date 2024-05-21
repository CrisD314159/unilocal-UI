import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
