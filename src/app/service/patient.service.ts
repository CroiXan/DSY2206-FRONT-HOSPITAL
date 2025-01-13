import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Patient } from '../model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  API_URI = 'https://0xmczu0ggc.execute-api.us-east-1.amazonaws.com/patients';
  defaultError = 'Ha ocurrido un error, intentelo mas tarde.'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({})
  };
  
  public getAllPatients(): Observable<Patient[] | string> {
    return this.http.get<Patient[]>(`${this.API_URI}`, this.httpOptions).pipe(
      catchError((error) => {
        var errorMSJ = ''
        if (typeof error === 'object') {
          errorMSJ = this.defaultError
        } else if (typeof error === 'string') {
          errorMSJ = error
        }
        return errorMSJ;
      })
    );
  }

  public getPatientsById(id: number): Observable<Patient | string> {
    return this.http.get<Patient>(`${this.API_URI}/${id}`, this.httpOptions).pipe(
      catchError((error) => {
        var errorMSJ = ''
        if (typeof error === 'object') {
          errorMSJ = this.defaultError
        } else if (typeof error === 'string') {
          errorMSJ = error
        }
        return errorMSJ;
      })
    );
  }
  
  public postPatient(patient: Patient): Observable<Patient | string> {
    return this.http.post<Patient>(`${this.API_URI}`, patient, this.httpOptions).pipe(
      catchError((error) => {
        var errorMSJ = ''
        if (typeof error === 'object') {
          errorMSJ = this.defaultError
        } else if (typeof error === 'string') {
          errorMSJ = error
        }
        return errorMSJ;
      })
    );
  }

  public putPatient(id: number, patient: Patient): Observable<Patient | string> {
    return this.http.put<Patient>(`${this.API_URI}/${id}`, patient, this.httpOptions).pipe(
      catchError((error) => {
        var errorMSJ = ''
        if (typeof error === 'object') {
          errorMSJ = this.defaultError
        } else if (typeof error === 'string') {
          errorMSJ = error
        }
        return errorMSJ;
      })
    );
  }

  public deletePatient(id: number): Observable<string>{
    return this.http.delete<string>(`${this.API_URI}/${id}`, this.httpOptions);
  }

  public callAPI(actionCrud:string, patient: Patient, callback: (data: any) => void){
    if(actionCrud = "POST"){
      this.postPatient(patient);
    } else if (actionCrud = "PUT"){
      
    } else if (actionCrud = "DELETE"){
      
    } else if (actionCrud = "GET"){
      
    }
  }

  public findByRut(rut: string, callback: (data: Patient) => void){
    this.getAllPatients().subscribe({
      next: (data) => {
        if (typeof data === 'object') {
          var patientList: Patient[] = data
          const patient = patientList.find(item => item.rut == rut) ?? {};
          callback(patient)
        }else{
          callback({})
        }
      }
    });
  }
}
