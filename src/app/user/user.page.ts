import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  newNombre: string = '';
  newEmail: string = '';
  newPassword: string = '';
  formularioEdicion: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {
    this.formularioEdicion = this.fb.group({
      nombre: [''],
      email: [''],
      apellidos: [''],
    });
  }

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData) {
      this.formularioEdicion.patchValue({
        nombre: userData.nombre || '',
        email: userData.email || '',
        apellidos: userData.apellidos || '',
      });
    }
  }

  async guardar() {
    if (this.newNombre && this.newEmail && this.newPassword) {
      this.authService.updateUser(this.newNombre, this.newEmail, this.newPassword);
      await this.presentSuccessAlert();
      this.irHome(); 
    } else {
      await this.presentErrorAlert();
    }
  }

  irHome() {
    this.router.navigate(['/home']);
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Los datos han sido guardados correctamente.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Por favor, complete todos los campos.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}

