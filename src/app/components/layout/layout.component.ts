import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  currentUser$ = this.authService.currentUser$;

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
