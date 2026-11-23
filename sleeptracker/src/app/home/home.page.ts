import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel],
})
export class HomePage {
	entries: SleepData[] = [];
	constructor(public sleepService:SleepService) {}

	async ionViewWillEnter(){
		await this.sleepService.loadData();
		this.entries = [...SleepService.AllSleepData].sort((a,b) => b.loggedAt.getTime() - a.loggedAt.getTime());
	}

	
}
