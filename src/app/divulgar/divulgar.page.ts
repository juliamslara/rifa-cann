import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-divulgar',
  templateUrl: './divulgar.page.html',
  styleUrls: ['./divulgar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class DivulgarPage  {

  constructor() { }

  copiado = "";

  ionViewDidEnter(){
    this.copiado = "";
  }

  textToCopy: string = 'http://minharifadigital.shop';

  copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.copiado = "Link copiado!"
  }

}
