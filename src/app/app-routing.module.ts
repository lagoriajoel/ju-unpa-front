import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'disciplinas',
    loadChildren: () => import('./features/disciplinas/disciplinas.module').then(m => m.DisciplinasModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'unidades',
    loadChildren: () => import('./features/unidad-academica/unidad-academica.module').then(m => m.UnidadAcademicaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'torneos',
    loadChildren: () => import('./features/torneos/torneos.module').then(m => m.TorneosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipos',
    loadChildren: () => import('./features/equipos/equipos.module').then(m => m.EquiposModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'programa',
    loadChildren: () => import('./features/programacion/programacion.module').then(m => m.ProgramacionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'icons',
    loadChildren: () => import('./features/icons/icons.module').then(m => m.IconsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'typography',
    loadChildren: () => import('./features/typography/typography.module').then(m => m.TypographyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
