import {createReducer, on} from '@ngrx/store';
import {loginUser, logoutUser} from './user.actions';
import {UsersModel} from '../models/user.models';

export interface UserState {
  user: UsersModel | null;
}

export const initialState: UserState = {
  user: {
    id: "usr_001",
    email: "juan.perez@email.com",
    name: "Juan Pérez",
    profile: {

      age: 28,
      city: "Córdoba",
      description: "Entusiasta del fitness y la vida saludable",
      country: "Argentina",
      avatar: "https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2018%2F12%2F10152203%2Fcanguro-roger.jpg?auth=aecadc9ffd20cbd721e430ce9f4eb029ca37590515c0fb58ff7a7d92e0d2a886&smart=true&width=350&height=467&quality=85"
    },
    habits: {
      date: "2025-01-08",
      trained: "Sí",
      extraTraining: "Cardio 20 min",
      sleep: "7 horas",
      description: "Día de piernas, buen rendimiento general",
      totalCalories: 2450,
      totalProtein: 165,
      meals: [
        {
          type: "Desayuno",
          food: "Avena con banana y whey protein",
          calories: "450",
          protein: "35"
        },
        {
          type: "Almuerzo",
          food: "Pollo grillado con arroz y verduras",
          calories: "650",
          protein: "50"
        },
        {
          type: "Merienda",
          food: "Yogur griego con frutos secos",
          calories: "300",
          protein: "25"
        },
        {
          type: "Cena",
          food: "Salmón con batata y ensalada",
          calories: "550",
          protein: "40"
        },
        {
          type: "Snack",
          food: "Batido de proteína post-entreno",
          calories: "500",
          protein: "15"
        }
      ]
    },
    friends: [
      {
        id: "usr_002",
        name: "Maria",
        description: "Entusiasta del fitness y la vida saludable",
        avatar: "https://www.infobae.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-wordpress-client-uploads%2Finfobae-wp%2Fwp-content%2Fuploads%2F2018%2F12%2F10152203%2Fcanguro-roger.jpg?auth=aecadc9ffd20cbd721e430ce9f4eb029ca37590515c0fb58ff7a7d92e0d2a886&smart=true&width=350&height=467&quality=85"
      },
    ],
    config: {
      invisibility:{
        profile: true,
        habits: false,
        friends: true
      },
      blockeds: [{id: "etc", name: "hori"}]
    },
    pr: [
      {
        id: "",
        workoutType: "",
        weightLifted: 24,
        createdAt: ""
      }
    ]
  }
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, {user}) => ({...state, user})),
  on(logoutUser, (state) => ({...state, user: null}))
);
