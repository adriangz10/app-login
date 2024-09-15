import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  paquetes: any[] = [];

  public nombre: string = '';
  paqueteData = {
    nombre: '',
    email: '',
    direccion: ''
  };

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController, private platForm: Platform) {}

  ngOnInit() {
    this.loadPackages();

    this.platForm.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/home') {
        CapacitorApp.exitApp();
      } 
    });
  }

  async registerPaquete() {
    if (this.paqueteData.nombre && this.paqueteData.email && this.paqueteData.direccion) {
      const paquetes = JSON.parse(localStorage.getItem('paquetes') || '[]');
      
      paquetes.push(this.paqueteData);
      localStorage.setItem('paquetes', JSON.stringify(paquetes));

      this.paqueteData = {
        nombre: '',
        email: '',
        direccion: ''
      };

      this.loadPackages();

      const toast = await this.toastController.create({
        message: 'Paquete registrado exitosamente',
        duration: 3000,
        position: 'top',
        color: 'success'
      });
      toast.present();

    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos.',
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
    }
  }

  loadPackages() {
    const storedPackages = localStorage.getItem('paquetes');
    if (storedPackages) {
      this.paquetes = JSON.parse(storedPackages);
    }
  }

  irUser() {
    this.router.navigate(['/user']);
  }

  irLogin() {
    this.authService.logout();
  }

  ionViewWillEnter() {
    this.nombre = this.authService.getNombre();
  }

}
