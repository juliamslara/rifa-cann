import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonList,
  IonItem,
  IonThumbnail,
  IonImg,
  IonLabel,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    IonButtons,
    IonButton,
    IonIcon,
    IonModal,
    IonList,
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    RouterLink,
    IonFab,
    IonFabButton,
  ],
})
export class HomePage {
  @ViewChild('modalInfo', { read: IonModal }) modalInfo!: IonModal;


  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modalInfo.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalInfo.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  items = [
    {
      img: 'assets/images/purplef-lq.jpg',
      name: 'Isqueiro Purple Fire Elétrico',
    },
    {
      img: 'assets/images/bag-lq.jpg',
      name: 'Case Bag Puff Life Clássica',
    },
    {
      img: 'assets/images/piteirasvidro-lq.jpg',
      name: '3 Piteiras de Vidro Purple Fire',
    },
    { img: 'assets/images/ziplock-lq.jpg', name: 'Zip Lock Puff Life' },
    {
      img: 'assets/images/dichava-lq.jpg',
      name: 'Dichavador Space Krusher',
    },
    { img: 'assets/images/cuia-lq.jpg', name: 'Cuia Purple Fire' },
    { img: 'assets/images/moco-lq.jpg', name: 'Mocó Purple Fire' },
    { img: 'assets/images/basex-lq.jpg', name: 'Base Boladora UmDois' },
    {
      img: 'assets/images/sedas-lq.jpg',
      name: 'Sedas Raw e Bem Bolado',
    },
    {
      img: 'assets/images/piteiras-lq.jpg',
      name: 'Piteiras Raw e Bem Bolado',
    },
    {
      img: 'assets/images/tesoura-lq.jpg',
      name: 'Tesoura Dobrável Aço Inox',
    },
  ];

  constructor() {}
}
