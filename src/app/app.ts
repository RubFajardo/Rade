import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-[#1a1a1a] text-white py-4 fixed z-50  w-screen ">
      <div class="px-12 mx-auto flex items-center justify-between w-full ">
        <!-- Logo -->
        <div class="flex items-center">
          <div class="w-8 h-8 bg-[#FFD22A] rounded-lg flex items-center justify-center">
            <span class="text-black font-bold text-xl">◆</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-8 text-sm">
          <a
            routerLink="/about"
            routerLinkActive="text-white"
            [routerLinkActiveOptions]="{exact: false}"
            class="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            About
          </a>

          <a
            routerLink="/contact"
            routerLinkActive="text-white"
            [routerLinkActiveOptions]="{exact: false}"
            class="text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </a>

          <!-- Download Button -->
          <a
            routerLink="/login"
            class="bg-[#FFD22A] text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2  transition-colors">
            <span>Get Started</span>
          </a>
        </div>


      </div>
    </nav>

    <main class="bg-[#1a1a1a] relative min-h-screen flex items-center justify-center overflow-hidden w-full ">
      <router-outlet></router-outlet>
    </main>
  `

})
export class App {
}
