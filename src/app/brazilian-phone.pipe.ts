import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'brazilianPhone',
})
@Injectable({
  providedIn: 'root',
})
export class BrazilianPhonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Format as (XX) XXXXX-XXXX
    return `(${numericValue.substring(0, 2)}) ${numericValue.substring(2, 7)}-${numericValue.substring(7, 11)}`;
  }
}