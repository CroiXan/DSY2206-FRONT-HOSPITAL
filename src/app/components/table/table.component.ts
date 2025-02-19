import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../model/patient.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() rows: Patient[] = [];
  @Input() label: string = "";
  @Output() referscar = new EventEmitter();
  noDataMessage: string = "Registro no encontrado.";

  editando: { [id: number]: boolean } = {};
  datosEditados: { [id: number]: Patient } = {};

  constructor(
    private patientService: PatientService
  ) { }

  activarEdicion(row: Patient) {
    console.log('guardarEdicion '+row.id)
    if (row.id !== undefined) {
      this.editando[row.id] = true;
      this.datosEditados[row.id] = { ...row };
    }
  }

  guardarEdicion(id: number) {
    if (this.datosEditados[id]) {
      console.log('guardarEdicion '+id)
      this.editando[id] = false;
      this.patientService.updatePatient(this.datosEditados[id], (data: Patient) => {
        if (data.id !== undefined) {
          console.log('Paciente actualizado correctamente '+JSON.stringify(this.datosEditados[id]));
          this.editando[id] = false;
          this.referscar.emit();
        } else {
          console.error('Error al actualizar el paciente');
        }
      });
    }
  }

  cancelarEdicion(id: number) {
    this.editando[id] = false;
    delete this.datosEditados[id];
  }

  eliminarPaciente(id: number | undefined) {
    if (id !== undefined) {
      this.patientService.deletePatient(id).subscribe({
        next: (response) => {
          console.log('Paciente eliminado');
          this.referscar.emit();
        },
        error: (err) => console.error('Error en la API:', err)
      });
    }

  }


}
