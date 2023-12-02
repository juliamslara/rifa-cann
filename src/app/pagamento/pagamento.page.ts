import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../api.service';
import * as QRCode from 'qrcode';
import { Util } from '../util';
import { createStaticPix, hasError } from 'pix-utils';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PagamentoPage {
  public static rifaDetail = { nome: '', telefone: '', pagamento: 'pendente' };

  public static quantidade = 1;

  pixQrCodeUrl = '';

  constructor(private apiService: ApiService, private toast: ToastController) {}

  textToCopy: string = 'Pix Copia e Cola';

  copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.textoObrigado =
      'Pix copiado! Muito Obrigado pela ajuda! Aguarde o sorteio dia 31/12 as 13:00';
  }

  textoObrigado = '';

  ionViewDidEnter() {
    this.comprarRifa();
    this.textoObrigado = '';
  }

  async comprarRifa() {
    var compraRifa = PagamentoPage.rifaDetail;
    var qtd = PagamentoPage.quantidade;

    const pix = createStaticPix({
      merchantName: 'Julia Mariana da Silva',
      merchantCity: 'Sao Paulo',
      pixKey: '08368823188',
      infoAdicional: compraRifa.telefone,
      transactionAmount: qtd,
    });

    if (!hasError(pix)) {
      const brCode = pix.toBRCode();
      // 00020126650014br.gov.bcb.pix0119nubank@thalesog.com0220Gerado por Pix-Utils52040000530398654041.005802BR5914Thales Ogliari6009Sao Paulo62070503***63046069
      var payload = brCode;
      if (payload != undefined) {
        this.generatePixQrCode(payload).then((url) => {
          this.pixQrCodeUrl = url;
        });
        this.textToCopy = brCode;
      }
    }

    var totalRifas = [];
    for (var i = 0; i < qtd; i++) {
      var r = await this.apiService.postData(compraRifa);
      console.log(r);
      totalRifas.push(r);
    }
    // localStorage.setItem('rifas', totalRifas.toString());
  }

  generatePixQrCode(payload: string): Promise<string> {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(payload, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }
}
