import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hospital-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hospital-sidebar.component.html',
  styleUrls: ['./hospital-sidebar.component.css']
})
export class HospitalSidebarComponent implements OnInit {
  collapsed = false;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  
  sidebarMenuItems: any[] = [
    { label: 'Dashboard', icon: 'bi-house-door', link: '/dashboard' },
    { label: 'Modulo Pacientes', icon: 'bi-person', link: '/paciente' },
    { label: 'Modulo Soporte', icon: 'bi-gear', link: '/soporte' }
  ];

  constructor(
    private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
  
          // Obtener y guardar el token de acceso
          this.authService.acquireTokenSilent({ scopes: [] }).subscribe({
            next: (tokenResponse) => {
              localStorage.setItem('jwt', tokenResponse.idToken); // Guarda el token en el localStorage
              console.log('ID token guardado en localStorage:', tokenResponse.idToken);
            },
            error: (error) => {
              console.error('Error obteniendo el token de acceso:', error);
            },
          });
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
  
          // Obtener y guardar el token de acceso
          this.authService.acquireTokenSilent({ scopes: [] }).subscribe({
            next: (tokenResponse) => {
              localStorage.setItem('jwt', tokenResponse.accessToken);
              console.log('Access token guardado en localStorage:', tokenResponse.accessToken);
            },
            error: (error) => {
              console.error('Error obteniendo el token de acceso:', error);
            },
          });
        });
    }
  }
  

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
