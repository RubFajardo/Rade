import {Component, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import {selectUser} from '../../../features/auth/state/auth.selectors';
import {logoutUser} from '../../../features/auth/state/auth.actions';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private store = inject(Store);
  user = toSignal(this.store.select(selectUser));
  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(value => !value);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }


  logout() {
    this.store.dispatch(logoutUser());
    this.closeDropdown();
  }
}
