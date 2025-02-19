import { Component } from '@angular/core';
import { VitalSignComponent } from "../vital-sign/vital-sign.component";
import { Subject } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [VitalSignComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title: string = "Dashboard";
  subtitle: string = "Bienvenido al panel Dashboard. Aquí podras revisar información general del sistema.";
  isLoggedIn = false;
  private readonly destroy$ = new Subject<void>();

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
    this.msalService.instance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        this.isLoggedIn = true;
      } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
        this.isLoggedIn = false;
      }
    });
    this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
