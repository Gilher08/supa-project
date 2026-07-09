import { Routes } from '@angular/router';
import { Taches } from './pages/taches/taches';
import { Parametres } from './pages/parametres/parametres';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'taches',
    component: Taches
  },
  {
    path: 'parametres',
    component: Parametres
  }
];
