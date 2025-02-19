import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VitalSign } from '../model/vitalsign.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VitalsignService {

  API_URI = 'https://0xmczu0ggc.execute-api.us-east-1.amazonaws.com/vitalsign';
  defaultError = 'Ha ocurrido un error, intentelo mas tarde.'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({})
  };

  getLastVitalSign(id: number): Observable<VitalSign> {
    return this.http.get<VitalSign>(`${this.API_URI}/last/patient/${id}`, this.httpOptions);
  }
}
