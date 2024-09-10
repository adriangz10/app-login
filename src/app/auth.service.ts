import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_KEY = 'user';

  constructor(private router: Router) {}

  // Método para almacenar el usuario en formato JSON
  setUser(nombre: string, email: string, password: string) {
    const user = {
      nombre: nombre,
      email: email,
      password: password
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Método para obtener el nombre del usuario desde localStorage
  getNombre(): string {
    const user = this.getUser();
    return user ? user.nombre : '';
  }

  // Método para obtener el email del usuario desde localStorage
  getEmail(): string {
    const user = this.getUser();
    return user ? user.email : '';
  }

  // Método para obtener la contraseña del usuario desde localStorage
  getPassword(): string {
    const user = this.getUser();
    return user ? user.password : '';
  }

  // Método auxiliar para obtener el objeto usuario desde localStorage
  private getUser(): { nombre: string, email: string, password: string } | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Método para borrar el usuario de localStorage
  clearUser() {
    localStorage.removeItem(this.USER_KEY);
  }

  // Método para actualizar los datos del usuario
  updateUser(newNombre: string, newEmail: string, newPassword: string) {
    this.setUser(newNombre, newEmail, newPassword);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

