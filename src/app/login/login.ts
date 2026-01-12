import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User, UserService} from './login.service';
import {Store} from '@ngrx/store';
import {loginUser} from '../state/user.actions';
import {RouterLink} from '@angular/router';
import {UsersModel} from '../models/user.models';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = true;
  showPassword = false;
  user$!: Observable<User | null>;
  successRegister: boolean = false;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  constructor(private userService: UserService,
              private store: Store) {
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }


  onSubmit(form: any) {
    const user: User = form.value;

    if (this.isLoginMode) {


      this.userService.login(user).subscribe({
        next: (res) => {
          const user: User = res.user
          this.store.dispatch(loginUser({user}));
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
          this.successRegister = true;
          this.isLoginMode = true;
        },
        error: (err) => {
          console.error('❌ Error en registro:', err);
        }
      });
    }
  }

}
//nota
