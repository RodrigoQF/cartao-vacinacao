import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {
        path: 'login',
        loadComponent: () => import('./modules/login/login-component').then((m) => m.LoginComponent)
    },
    {
        path: 'cartao-vacina',
        loadComponent: () => import('./modules/cartao-vacina/cartao-vacina-component').then((m) => m.CartaoVacinaComponent)
    }
];
