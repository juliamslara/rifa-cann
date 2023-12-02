import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pagamento',
    loadComponent: () =>
      import('./pagamento/pagamento.page').then(
        (m) => m.PagamentoPage
      ),
  },
  {
    path: 'participar',
    loadComponent: () => import('./participar/participar.page').then( m => m.ParticiparPage)
  },
  {
    path: 'divulgar',
    loadComponent: () => import('./divulgar/divulgar.page').then( m => m.DivulgarPage)
  },
];
