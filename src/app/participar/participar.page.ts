import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Rifa } from '../models/rifa';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { BrazilianPhonePipe } from '../brazilian-phone.pipe';
import { ToastController } from '@ionic/angular';
import { AlertController, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { PagamentoPage } from '../pagamento/pagamento.page';

@Component({
  selector: 'app-participar',
  templateUrl: './participar.page.html',
  styleUrls: ['./participar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class ParticiparPage {
  rifas: Array<Rifa> = [];

  telefone!: string;

  phoneNumber: string = '';
  possuiRifas = false;

  constructor(
    private apiService: ApiService,
    private brazilianPhonePipe: BrazilianPhonePipe,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    var telefone = localStorage.getItem('telefone');
    this.telefone = telefone != null ? telefone : '';

    if (telefone != null) {
      this.phoneNumber = telefone;
      this.getFormattedPhoneNumber();
      apiService.getDataByTelefone(telefone).then((data) => {
        this.rifas = data;
        console.log(data);
        if (
          this.rifas != undefined &&
          this.rifas != null &&
          this.rifas.length > 0
        ) {
          this.possuiRifas = true;
        }
      });
    }
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Rifas Compradas',
      subHeader: 'Validação do Pagamento pode demorar até 4 horas',
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          handler: () => {
            // Handle the "Voltar" button action if needed
          }
        }
      ],
      backdropDismiss: false, // Set to true if you want to allow dismissing the alert by clicking outside it
      animated: true, // Set to false if you don't want animations
      translucent: true, // Set to false for a solid background
      cssClass: 'customalert',
      message: this.buildAlertContent() // Function to build the content
    });

    await alert.present();
  }

  buildAlertContent() {
    return `
        ${this.rifas.map(r => `
          Rifa:${r.id}|Pagamento:${r.pagamento} 
        `).join('')}
    `;
  }

  @ViewChild('inputField', { static: false })
  inputField!: IonInput;

  mensagem: string = '';

  name: string = '';

  onReleaseGetData(telefone: string) {
    const parsedNumber = parsePhoneNumberFromString(telefone, 'BR');
    if (
      parsedNumber != undefined &&
      parsedNumber != null &&
      parsedNumber.isValid()
    ) {
      var tel = this.replaceStringTelefone(telefone);
      this.apiService.getDataByTelefone(tel).then((data) => {
        this.rifas = data;
      });
      localStorage.setItem('telefone', tel);
    } else {
      this.presentErrorToast();
    }
  }

  getFormattedPhoneNumber(): string {
    var numberToFormat = this.replaceStringTelefone(this.phoneNumber);
    var formattedNumber = this.brazilianPhonePipe.transform(numberToFormat);
    console.log(formattedNumber);
    this.phoneNumber = formattedNumber;
    if (numberToFormat.length == 11) {
      this.onReleaseGetData(numberToFormat);
    }
    return formattedNumber;
  }

  replaceStringTelefone(telefone: string) {
    return telefone
      .replace('(', '')
      .replace(')', '')
      .replace(' ', '')
      .replace('-', '');
  }

  comprarRifa() {
    var compraRifa = {
      nome: this.name,
      telefone: this.replaceStringTelefone(this.phoneNumber),
      pagamento: 'pendente',
    };
    PagamentoPage.rifaDetail = compraRifa;
    PagamentoPage.quantidade = this.selectedNumber;
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Telefone inválido',
      duration: 3500, // Duration in milliseconds
      position: 'top', // Position can be 'top', 'bottom', 'middle'
      color: 'danger', // Color can be 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'
      buttons: [
        {
          text: 'Entendi',
          role: 'cancel', // This role will make it the primary action
          handler: () => {
            this.phoneNumber = '';
            this.inputField.setFocus();
          },
        },
      ],
    });
    if (this.toastAllowed) {
      toast.present();
    }
  }

  ionViewDidEnter() {
    this.toastAllowed = true;
  }

  toastAllowed = true;

  selectedNumber: number = 1;

  increment() {
    this.selectedNumber++;
  }

  decrement() {
    if (this.selectedNumber > 1) {
      this.selectedNumber--;
    }
  }

  validateInput(event: any) {
    const inputValue = parseInt(event.detail.value, 10);
    if (isNaN(inputValue) || inputValue < 1) {
      // If the input is not a number or less than 1, reset to 1
      this.selectedNumber = 1;
    }
  }
}
