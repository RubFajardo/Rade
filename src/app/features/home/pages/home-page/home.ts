import {Component, OnDestroy, OnInit} from '@angular/core';

interface CarouselSlide {
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  currentIndex = 0;
  autoPlayInterval: any;

  slides: CarouselSlide[] = [
    {
      title: 'Registra tus comidas',
      subtitle: 'Lleva un control detallado de cada comida, snack y bebida. Calcula automáticamente tus calorías, macros y alcanza tus objetivos nutricionales con facilidad.',
      image: 'assets/food-tracking.jpg'
    },
    {
      title: 'Planes personalizados',
      subtitle: 'Rutinas de ejercicio adaptadas a tu nivel, objetivos y disponibilidad. Desde principiante hasta avanzado, encuentra el plan perfecto para ti.',
      image: 'assets/workout-plans.jpg'
    },
    {
      title: 'Recetas saludables',
      subtitle: 'Descubre cientos de recetas nutritivas con información completa de calorías y macros. Cocina rico, sano y sin complicaciones.',
      image: 'assets/healthy-recipes.jpg'
    }
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex = this.currentIndex === 0
      ? this.slides.length - 1
      : this.currentIndex - 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 4000); // Cambia cada 4 segundos
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // Pausa el autoplay cuando el usuario interactúa
  onUserInteraction() {
    this.stopAutoPlay();
    // Opcional: reinicia el autoplay después de 10 segundos
    setTimeout(() => this.startAutoPlay(), 10000);
  }
}
