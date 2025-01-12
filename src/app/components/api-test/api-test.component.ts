import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DefaultBackendService } from '../../service/default-backend.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-api-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-test.component.html',
  styleUrl: './api-test.component.css'
})
export class ApiTestComponent {
  profile: ProfileType | undefined;
  responseBackend!: object;

  constructor(private authService: MsalService,private http: HttpClient, private backendService: DefaultBackendService) {}

  ngOnInit() {
    this.getProfile(environment.apiConfig.uri);
  }

  getProfile(url: string) {
    this.http.get(url).subscribe((profile) => {
      this.profile = profile;
    });
  }
  llamarBackend(): void {
    this.backendService.consumirBackend().subscribe(response => {
      this.responseBackend = response;
    });
  }

  mostrarResponseBackend(): string {
    return JSON.stringify(this.responseBackend);
  }
}
