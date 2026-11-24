import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, bedOutline, addOutline } from 'ionicons/icons';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, RouterLink],
})
export class HomePage {
  lastOvernight?: OvernightSleepData;
  latestSleepiness?: StanfordSleepinessData;

  constructor(public sleepService: SleepService, private router: Router) {
    addIcons({ moonOutline, sunnyOutline, bedOutline, addOutline });
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && e.urlAfterRedirects.startsWith('/home')){
        this.refresh();
      }
    });
  }


  async ionViewWillEnter() {
    await this.refresh();
  }

  async refresh(){
    await this.sleepService.loadData();
    this.lastOvernight = [...SleepService.AllOvernightData].sort((a,b) => b.sleepEnd.getTime() - a.sleepEnd.getTime())[0];
    this.latestSleepiness = [...SleepService.AllSleepinessData].sort((a,b) => b.loggedAt.getTime() - a.loggedAt.getTime())[0];
  }

  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
