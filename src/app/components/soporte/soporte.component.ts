import { Component } from '@angular/core';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {

  title:string = "Modulo Soporte";
  subtitle: string = "Bienvenido al modulo de Soporte. Aqui podrás gestionar solicitudes o reportar incidencias al equipo de soporte.";

}
