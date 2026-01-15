import { Component } from '@angular/core';
import {Friends, PendingFriendRequest} from '../../../models/user.models';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-friends-bar',
  imports: [FormsModule],
  templateUrl: './friends-bar.html',
  styleUrl: './friends-bar.css'
})
export class FriendsBar {

  isFriendsMode: boolean = true;
  isCollapsed: boolean = true;
  searchQuery: string = "";
  friends: Friends[] = [
    {
      id: 50,
      name: "Juan",
      description: "So I started to walk into the water.",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Juan",
      description: "So I started to walk into the water.",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Amanda",
      description: "me gusta el pan",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Maria",
      description: "me gusta el pan",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Ruben",
      description: "me gusta el pan",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Horacio",
      description: "me gusta el pan",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Pablo",
      description: "me gusta el pan",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    },
    {
      id: 50,
      name: "Pepe",
      description: "me gusta el pan",
      avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
    }
  ];

  pendingRequests: PendingFriendRequest[] = [
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    },
    {
      sender: {
        id: 50,
        name: "Juan",
        description: "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me.",
        avatar: "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
      },
      requestId: 50
    }
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  get filteredFriends() {
    if (!this.searchQuery) return this.friends;
    return this.friends.filter(f =>
      f.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
