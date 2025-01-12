import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ApiTestComponent } from './components/api-test/api-test.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'apitest',
        component: ApiTestComponent,
        canActivate: [MsalGuard],
      }
];
