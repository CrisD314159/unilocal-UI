import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-guest-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, FooterComponent],
  templateUrl: './guest-header.component.html',
  styleUrl: './guest-header.component.css'
})
export class GuestHeaderComponent {

}
