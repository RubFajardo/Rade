import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {User, UserService} from './login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  get isDesktop(): boolean {
    return window.innerWidth >= 768; // md breakpoint
  }

  constructor(private userService: UserService) {}

  onSubmit(form: any) {
    const user: User = form.value;

    if (this.isLoginMode) {
      console.log('Iniciando sesión con:', user);

      this.userService.login(user).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          console.log('✅ Login correcto:', res);
        },
        error: (err) => {
          console.error('❌ Error en login:', err);
        }
      });

    } else {
      console.log('Registrando:', user);

      this.userService.register(user).subscribe({
        next: (res) => {
          console.log('✅ Registro correcto:', res);
        },
        error: (err) => {
          console.error('❌ Error en registro:', err);
        }
      });
    }
  }

}
