import {Component} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {UserService} from './login.service';
import {Store} from '@ngrx/store';
import {loginUser} from '../state/user.actions';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthResponse, UsersModel} from '../models/user.models';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isLoginMode = true;
  showPassword = false;
  user$!: Observable<UsersModel | null>;
  successRegister: boolean = false;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  constructor(private userService: UserService,
              private store: Store,
              private cookieService: CookieService) {
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }


  onSubmit(form: any) {

    if (this.isLoginMode) {

      this.userService.login(form.value).subscribe({
        next: (res: AuthResponse) => {
          const user: UsersModel = res.user;
          this.store.dispatch(loginUser({user}));
          this.cookieService.set(
            'auth_token',
            res.token,
            1,              // días guardado
            '/',
            undefined,
            true,          //
            'Strict'
          );
          console.log('✅ Login correcto:', res);
        },
        error: (err) => {
          console.error('❌ Error en login:', err);
        }
      });

    } else {

      this.userService.register(form.value).subscribe({
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
