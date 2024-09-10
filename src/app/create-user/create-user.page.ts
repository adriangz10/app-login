import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage {
  public nombre: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private authService: AuthService 
  ) {}

  irUser() {
    this.router.navigate(['/login'])
  }

  crearUsuario() {
    if (this.email && this.password && this.nombre) {
      // Almacenar los datos en localStorage usando AuthService
      this.authService.setUser(this.nombre, this.email, this.password);
      
      this.router.navigate(['/login']);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ERROR',
      message: 'Por favor complete todos los campos',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}

