import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';

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
	public async saveData(){
		await Preferences.set({ key: 'overnight', value: JSON.stringify(SleepService.AllOvernightData)});
		await Preferences.set({ key: 'sleepiness', value: JSON.stringify(SleepService.AllSleepinessData)});
	}

	public async loadData(){
		const overnight = await Preferences.get({ key: 'overnight'});
		const sleepiness = await Preferences.get({ key: 'sleepiness'});

		SleepService.AllOvernightData = JSON.parse(overnight.value ?? '[]').map((o: any) =>
		new OvernightSleepData(new Date(o.sleepStart), new Date(o.sleepEnd), o.id, new Date(o.loggedAt)));

		SleepService.AllSleepinessData = JSON.parse(sleepiness.value ?? '[]').map((s: any) =>
			new StanfordSleepinessData(s.loggedValue, new Date(s.loggedAt), s.id));

		SleepService.AllSleepData = [...SleepService.AllOvernightData, ...SleepService.AllSleepinessData];
	
	}
}
