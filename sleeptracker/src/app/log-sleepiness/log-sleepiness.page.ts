import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonFooter,
  IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton, IonModal, IonButton,
  ToastController, NavController
} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData} from '../data/stanford-sleepiness-data';
import { toLocalISO } from '../utils/time';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFooter,
    IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonDatetime, IonDatetimeButton, IonModal, IonButton],
})
export class LogSleepinessPage{
  levels = [1, 2, 3, 4, 5, 6, 7];
  scale = StanfordSleepinessData.ScaleValues;
  level?: number;
  time = toLocalISO(new Date());
  maxTime = this.time;

  constructor(
    private sleepService: SleepService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {}


  async save(){
    if (!this.level) return;
    await this.sleepService.logSleepinessData(new StanfordSleepinessData(this.level, new Date(this.time)));
    
    const toast = await this.toastCtrl.create({ message: 'Logged sleepiness: ' + this.level, duration: 2000});
    await toast.present();
    this.navCtrl.navigateBack('/home');
  }

}
