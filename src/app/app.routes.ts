import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'cartao-vacina'},
    {
        path: 'cartao-vacina',
        loadComponent: () => import('./modules/cartao-vacina/cartao-vacina-component').then((m) => m.CartaoVacinaComponent)
    }
];
