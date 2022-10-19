import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { EditarComponent } from './pages/editar/editar.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'agregar',    component: AgregarComponent},
      {path: 'carrito',    component: CarritoComponent},
      {path: 'menu',       component: MenuComponent},
      {path: 'registro',   component: RegistroComponent},
      {path: 'login',      component: LoginComponent},
      {path: 'editar/:id', component: EditarComponent},
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

