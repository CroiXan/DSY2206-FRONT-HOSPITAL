import { Component } from '@angular/core';
import { VitalSign } from '../../model/vitalsign.model';
import { forkJoin, interval, Subscription, switchMap } from 'rxjs';
import { VitalsignService } from '../../service/vitalsign.service';
import { PatientService } from '../../service/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vital-sign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vital-sign.component.html',
  styleUrl: './vital-sign.component.css'
})
export class VitalSignComponent {
  vitalSigns: VitalSign[] = [];
  private subscription!: Subscription;

  constructor(
    private vitalSignService: VitalsignService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.subscription = interval(5000)
      .pipe(
        switchMap(() => this.patientService.getAllPatientsId()),
        switchMap((ids) => {
          this.vitalSigns = [];
          const requests = ids.map((id) => this.vitalSignService.getLastVitalSign(id));
          return forkJoin(requests);
        })
      )
      .subscribe((data) => {
        this.vitalSigns = data.filter((sign) => sign.id !== 0)
      });

    this.patientService.getAllPatientsId().subscribe((ids) => {
      this.vitalSigns = [];
      const requests = ids.map((id) => this.vitalSignService.getLastVitalSign(id));
      forkJoin(requests).subscribe((data) => {
        this.vitalSigns = data.filter((sign) => sign.id !== 0)
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
