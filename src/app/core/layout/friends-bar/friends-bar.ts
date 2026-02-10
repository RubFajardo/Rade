import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {FriendsService} from '../../../features/friends/services/friends-bar.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {selectFriends, selectPendingRequests} from '../../../features/friends/state/friends.selectors';
import {selectUser} from '../../../features/auth/state/auth.selectors';
import { CommonModule, NgClass } from '@angular/common'; // Importar NgClass

@Component({
  selector: 'app-friends-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './friends-bar.html',
  styleUrl: './friends-bar.css'
})
export class FriendsBar {

  constructor(private friendsService: FriendsService) {
  }

  private store = inject(Store);
  isFriendsMode: boolean = true;
  isCollapsed: boolean = true;
  searchQuery = signal('');
  friends = toSignal(this.store.select(selectFriends), {initialValue: []});
  pendingRequests = toSignal(this.store.select(selectPendingRequests), {initialValue: []});
  currentUser = toSignal(this.store.select(selectUser));


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  filteredFriends = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const list = this.friends();

    if (!query) return list;

    return list.filter(f =>
      f.name.toLowerCase().includes(query)
    );
  });

}
