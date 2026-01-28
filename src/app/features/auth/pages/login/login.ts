import {Component, effect, inject} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RouterLink} from '@angular/router';
import {loginUser, registerUser} from '../../state/auth.actions';
import {selectLoading, selectLoginError, selectSuccessMessage} from '../../state/auth.selectors';
import {LoginPayload, RegisterPayload} from '../../models/credentials.model';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  isLoginMode = true;
  showPassword = false;
  private store = inject(Store);

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  errorMessage = toSignal(this.store.select(selectLoginError));
  isLoading = toSignal(this.store.select(selectLoading));
  successMessage = toSignal(this.store.select(selectSuccessMessage));

  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  constructor() {
    // El effect de Angular (no de NgRx) se ejecuta cada vez que el Signal cambia
    effect(() => {
      const success = this.successMessage(); // Accedemos al valor del Signal
      if (success) {
        this.isLoginMode = true; // O false, según lo que necesites tras el registro
        // Opcional: resetear el formulario aquí

      }
    });
  }


  onSubmit(form: any) {

    if (this.isLoginMode) {

      const credentials:LoginPayload = {
        email: form.value.email,
        password: form.value.password
      }

      this.store.dispatch(loginUser({ credentials }));

    } else {

      const credentials: RegisterPayload = {
        name: (form.value.firstName + " " + form.value.lastName).trim(),
        email: form.value.email,
        password: form.value.password
      }

      this.store.dispatch(registerUser({ credentials }))
    }
  }
}
