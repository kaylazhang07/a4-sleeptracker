import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonSegment, IonSegmentButton, IonItemSliding, IonItemOptions, IonItemOption,
  IonIcon, IonModal, IonButtons, IonButton, IonNote, IonDatetime, IonDatetimeButton,
  IonRadioGroup, IonRadio, AlertController, ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, moonOutline, sunnyOutline, timeOutline, chevronBackOutline } from 'ionicons/icons';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { toLocalISO } from '../utils/time';

type Filter = 'all' | 'overnight' | 'sleepiness';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonSegment, IonSegmentButton, IonItemSliding, IonItemOptions, IonItemOption,
    IonIcon, IonModal, IonButtons, IonButton, IonNote, IonDatetime, IonDatetimeButton,
    IonRadioGroup, IonRadio,
  ],
})
export class HistoryPage {
  filter: Filter = 'all';
  entries: SleepData[] = [];

  // Edit modal state
  isEditOpen = false;
  editType: 'overnight' | 'sleepiness' | null = null;
  editId = '';
  // overnight fields
  editBedtime = '';
  editWakeTime = '';
  // sleepiness fields
  editLevel?: number;
  editTime = '';

  maxTime = toLocalISO(new Date());
  levels = [1, 2, 3, 4, 5, 6, 7];
  scale = StanfordSleepinessData.ScaleValues;

  constructor(
    private sleepService: SleepService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) {
    addIcons({ createOutline, trashOutline, moonOutline, sunnyOutline, timeOutline, chevronBackOutline });
  }

  async ionViewWillEnter() {
    await this.sleepService.loadData();
    this.refresh();
  }

  refresh() {
    let source: SleepData[];
    if (this.filter === 'overnight') source = SleepService.AllOvernightData;
    else if (this.filter === 'sleepiness') source = SleepService.AllSleepinessData;
    else source = SleepService.AllSleepData;
    this.entries = [...source].sort((a, b) => b.loggedAt.getTime() - a.loggedAt.getTime());
  }

  isOvernight(entry: SleepData): boolean {
    return entry instanceof OvernightSleepData;
  }

  // ---- Delete ----
  async confirmDelete(entry: SleepData, slider: IonItemSliding) {
    await slider.close();
    const alert = await this.alertCtrl.create({
      header: 'Delete this log?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await this.sleepService.deleteData(entry.id);
            this.refresh();
            const toast = await this.toastCtrl.create({ 
              message: 'Log deleted', 
              duration: 4000,
              buttons: [{
                text: 'Undo',
                handler: async () => {
                  if(entry instanceof OvernightSleepData){
                    await this.sleepService.logOvernightData(entry);

                  }
                  else if (entry instanceof StanfordSleepinessData){
                    await this.sleepService.logSleepinessData(entry);
                  }
                  this.refresh();
                },
              }],
             });
            await toast.present();
          },
        },
      ],
    });
    await alert.present();
  }

  // ---- Edit ----
  async openEdit(entry: SleepData, slider: IonItemSliding) {
    await slider.close();
    this.editId = entry.id;
    if (entry instanceof OvernightSleepData) {
      this.editType = 'overnight';
      this.editBedtime = toLocalISO(entry.sleepStart);
      this.editWakeTime = toLocalISO(entry.sleepEnd);
    } else if (entry instanceof StanfordSleepinessData) {
      this.editType = 'sleepiness';
      this.editLevel = entry.loggedValue;
      this.editTime = toLocalISO(entry.loggedAt);
    }
    this.isEditOpen = true;
  }

  closeEdit() {
    this.isEditOpen = false;
    this.editType = null;
    this.editId = '';
    this.editLevel = undefined;
  }

  get overnightError(): string {
    if (this.editType !== 'overnight') return '';
    const bed = new Date(this.editBedtime);
    const wake = new Date(this.editWakeTime);
    if (wake <= bed) return 'Wake-up time must be after bedtime.';
    if (wake > new Date()) return "Wake-up time can't be in the future.";
    if (wake.getTime() - bed.getTime() > 24 * 60 * 60 * 1000) return "Sleep can't be longer than 24 hours.";
    return '';
  }

  get canSave(): boolean {
    if (this.editType === 'overnight') return this.overnightError === '';
    if (this.editType === 'sleepiness') return !!this.editLevel;
    return false;
  }

  async saveEdit() {
    if (!this.canSave) return;
    if (this.editType === 'overnight') {
      await this.sleepService.updateOvernightData(this.editId, new Date(this.editBedtime), new Date(this.editWakeTime));
    } else if (this.editType === 'sleepiness') {
      await this.sleepService.updateSleepinessData(this.editId, this.editLevel!, new Date(this.editTime));
    }
    this.closeEdit();
    this.refresh();
    const toast = await this.toastCtrl.create({ message: 'Changes saved', duration: 1500 });
    await toast.present();
  }
}
