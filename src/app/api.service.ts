import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://minharifadigital.shop';

  private fetchData(endpoint: string): Promise<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  private postDataInternal(endpoint: string, data: any): Promise<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  getData(): Promise<any> {
    const endpoint = '/rifas';
    return this.fetchData(endpoint);
  }

  getDataByTelefone(telefone: string): Promise<any> {
    const endpoint = `/rifas?telefone=${telefone}`;
    return this.fetchData(endpoint);
  }

  postData(data: any): Promise<any> {
    const endpoint = '/rifas';
    return this.postDataInternal(endpoint, data);
  }
}

