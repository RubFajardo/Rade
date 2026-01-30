import {Component, inject, signal} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {Store} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {searchFriends, sendFriendRequest} from '../../state/friends.actions';
import {selectFriends, selectUsersSearch} from '../../state/friends.selectors';

@Component({
  selector: 'app-friends',
  imports: [
    FormsModule
  ],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends {

  private store = inject(Store);

  searchQuery = signal('');
  tabSelected:string = "searchTab"
  usersSearch = toSignal(this.store.select(selectUsersSearch), { initialValue: [] });
  friends = toSignal(this.store.select(selectFriends), { initialValue: [] });

  testArray = [
    {
      id: 2,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    },
    {
      id: 3,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    },
    {
      id: 6,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    },
    {
      id: 4,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    },
    {
      id: 3,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    },
    {
      id: 3,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    },
    {
      id: 3,
      name: "Madara Alejandra",
      description: "me gusta el pan",
      avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_neytiri_16x9_1098_01_0e7d844a.jpeg?region=420%2C0%2C1080%2C1080"
    }
  ];

  constructor() {
    // Convertimos la señal a un flujo de RxJS para usar debounce
    toObservable(this.searchQuery).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(term => {
      this.store.dispatch(searchFriends({ search: term }));
    });
  }

  handleSendRequest(receiverId: number) {
    this.store.dispatch(sendFriendRequest({receiverId}))
  }


}
