import { Component } from '@angular/core';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {

  title:string = "Módulo Soporte";
  subtitle: string = "Bienvenido al módulo de Soporte. Aquí podrás gestionar solicitudes o reportar incidencias al equipo de soporte.";

}
