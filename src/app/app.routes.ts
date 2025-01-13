import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ApiTestComponent } from './components/api-test/api-test.component';
import { AppComponent } from './app.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SoporteComponent } from './components/soporte/soporte.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/dashboard', 
        pathMatch:'full'},
    {
        path: 'apitest',
        component: ApiTestComponent,
        canActivate: [MsalGuard],
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'paciente',
      component: PacienteComponent,
      canActivate: [MsalGuard],
    },
    {
      path: 'soporte',
      component: SoporteComponent,
      canActivate: [MsalGuard],
    }
];
