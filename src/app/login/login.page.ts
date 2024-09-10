import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {}

  login() {
    const storedEmail = this.authService.getEmail();
    const storedPassword = this.authService.getPassword();

    if (this.email === storedEmail && this.password === storedPassword) {
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'CREDENCIALES INCORRECTAS',
      message: 'Email o contraseña incorrectas',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  irCreateUser() {
    this.router.navigate(['/create-user']);
  }
  
}

