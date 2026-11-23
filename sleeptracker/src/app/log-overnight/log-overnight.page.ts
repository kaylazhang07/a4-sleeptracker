import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter,
  IonList, IonItem, IonLabel, IonNote, IonDatetime, IonDatetimeButton, IonModal, IonButton,
  ToastController, NavController
} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData} from '../data/overnight-sleep-data';
import { toLocalISO, sameDay } from '../utils/time';

@Component({
  selector: 'app-log-overnight',
  templateUrl: './log-overnight.page.html',
  styleUrls: ['./log-overnight.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter,
    IonList, IonItem, IonLabel, IonNote, IonDatetime, IonDatetimeButton, IonModal, IonButton],
})
export class LogOvernightPage{
  bedtime = toLocalISO(defaultBedtime());
  wakeTime = toLocalISO(defaultWakeTime());
  maxTime = toLocalISO(new Date());

  constructor(
    private sleepService: SleepService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {}

  async ionViewWillEnter(){
    await this.sleepService.loadData();
  }

  get error(): string{
    const bed = new Date(this.bedtime);
    const wake = new Date(this.wakeTime);
    if (wake <= bed) return 'Wake-up time must be after bedtime.';
    if (wake > new Date()) return "Wake-up time can't be in the future";
    if (wake.getTime() - bed.getTime() > 24* 60 * 60 * 1000) return 'Sleep can\'t be longer than 24 hours.';
    if(SleepService.AllOvernightData.some(d => sameDay(d.sleepEnd, wake))){
      return 'You already logged sleep for this morning.';
    }
    return '';
  }


  async save(){
    const entry = new OvernightSleepData(new Date(this.bedtime), new Date(this.wakeTime));
    await this.sleepService.logOvernightData(entry);
    const toast = await this.toastCtrl.create({ message: 'Saved: ' + entry.summaryString(), duration: 2000});
    await toast.present();
    this.navCtrl.navigateBack('/home');
  }

}

function defaultBedtime(): Date {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(23, 0, 0, 0);
  return d;
}

function defaultWakeTime(): Date{
  const d = new Date();
  d.setHours(7, 0, 0,0);
  return d > new Date() ? new Date() : d;
}
