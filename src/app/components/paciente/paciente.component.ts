import { Component } from '@angular/core';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  title:string = "Módulo Pacientes";
  subtitle:string = "Bienvenido al módulo de Gestión de Pacientes Aquí podrás gestionar los registros de pacientes y otras tareas relacionadas.";

}
