import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];


	public async logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		await this.saveData();
	}

	public async logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		await this.saveData();
	}

	public async deleteData(id:string){
		SleepService.AllSleepData = SleepService.AllSleepData.filter(d => d.id !== id);
		SleepService.AllOvernightData = SleepService.AllOvernightData.filter(d => d.id !== id);
		SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter(d => d.id !== id);
		await this.saveData();
	}

	public async saveData() {}
	public async loadData() {}
}
