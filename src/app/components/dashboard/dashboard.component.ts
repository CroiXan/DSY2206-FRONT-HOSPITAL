import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title:string = "Dashboard";
  subtitle: string = "Bienvenido al panel Dashboard. Aqui podras revisar informacion general del sistema.";

}
