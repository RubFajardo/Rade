import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Store} from '@ngrx/store';
import {initAuth} from '../../state/auth.actions';

@Component({
  selector: 'app-oauth-success',
  imports: [],
  template: `
    <div class="min-h-screen bg-[#1b2838] flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-[#66c0f4] text-2xl font-bold mb-4">Iniciando sesión...</h2>
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#66c0f4] mx-auto"></div>
      </div>
    </div>
  `,
  styles: ``,
})
export class OauthSuccess implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  private store = inject(Store);

  ngOnInit(): void {

    // Capturamos el token de los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        // 1. Guardar el token
        this.cookieService.set(
          'auth_token',
          token,
          15,              // días guardado
          '/',
          undefined,
          true,
          'Strict'
        );

        this.store.dispatch(initAuth());
        this.router.navigate(['/profile'], { replaceUrl: true });
      } else {
        // Si no hay token, algo salió mal, volvemos al login
        this.router.navigate(['/login']);
      }
    });
  }
}
