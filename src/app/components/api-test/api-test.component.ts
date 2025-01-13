import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { DefaultBackendService } from '../../service/default-backend.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../model/patient.model';

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
  plainTextResponse = '';

  constructor(
    private authService: MsalService,
    private http: HttpClient,
    private backendService: DefaultBackendService,
    private patientService: PatientService) { }

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

  showPlainTextResponse(): string {
    return this.plainTextResponse;
  }

  testGetAllPatients() {
    this.patientService.getAllPatients().subscribe(response => {
      this.plainTextResponse = JSON.stringify(response);
    });
  }

  testGetPatientsById() {
    this.patientService.getPatientsById(1).subscribe(response => {
      this.plainTextResponse = JSON.stringify(response);
    });
  }

  testPostPatient() {
    var testPatient: Patient = {
      id: 10,
      rut: "12345678",
      password: "testing",
      nombre: "test",
      apellidos: "test",
      email: "testting@test.com",
      bornDate: "10-01-2000" // Formato: 'dd-MM-yyyy'
    }
    this.patientService.postPatient(testPatient).subscribe(response => {
      this.plainTextResponse = JSON.stringify(response);
    });
  }

  testPutPatient() {
    var testPatient: Patient = {
      id: 21,
      rut: "87654321",
      password: "testing",
      nombre: "test",
      apellidos: "test",
      email: "prueba@test.com",
      bornDate: "10-01-2000" // Formato: 'dd-MM-yyyy'
    }
    this.patientService.putPatient(21,testPatient).subscribe(response => {
      this.plainTextResponse = JSON.stringify(response);
    });
  }

  testDeletePatient() {
    this.patientService.getAllPatients().subscribe(response => {
      this.plainTextResponse = JSON.stringify(response);
    });
  }
}
