import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public nombre: string = '';
  public apellido: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  irUser() {
    this.router.navigate(['/user'])
  }

  irLogin() {
    this.authService.logout();
  }

  ionViewWillEnter() {
    this.nombre = this.authService.getNombre()
  }

}
