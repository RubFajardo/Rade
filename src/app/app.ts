import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-gray-900 text-green-400 p-4 flex justify-center gap-6 text-lg font-semibold">
      <a routerLink="/home" routerLinkActive="text-white">Home</a>
      <a routerLink="/login" routerLinkActive="text-white">Login</a>
      <a routerLink="/habits" routerLinkActive="text-white">Habits</a>
      <a routerLink="/profile" routerLinkActive="text-white">Profile</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {}
