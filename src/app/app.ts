import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {FriendsBar} from './core/layout/friends-bar/friends-bar';
import {selectUser} from './features/auth/state/auth.selectors';
import {toSignal} from '@angular/core/rxjs-interop';
import {initAuth} from './features/auth/state/auth.actions';
import {Navbar} from './core/layout/navbar/navbar';
import {Footer} from './core/layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, FriendsBar, Navbar, Footer],
  template: `

    <app-navbar></app-navbar>
    <main class="bg-[#1a1a1a] relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      @if (user()) {
        <app-friends-bar></app-friends-bar>
      }
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>

  `
})
export class App {

  private store = inject(Store);
  user = toSignal(this.store.select(selectUser));

  ngOnInit() {
    this.store.dispatch(initAuth());
  }

}
