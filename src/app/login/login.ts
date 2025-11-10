import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {User, UserService} from './login.service';
import { Store } from '@ngrx/store';
import { loginUser } from '../state/user.actions';
import { selectUser } from '../state/user.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = true;
  user$!: Observable<User | null>;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  get isDesktop(): boolean {
    return window.innerWidth >= 768; // md breakpoint
  }

  constructor(private userService: UserService,
              private store: Store) {}


  onSubmit(form: any) {
    const user: User = form.value;

    if (this.isLoginMode) {
      console.log('Iniciando sesión con:', user);

      this.userService.login(user).subscribe({
        next: (res) => {
          const user: User = res.user
          this.store.dispatch(loginUser({ user }));
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
