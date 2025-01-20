import { Component } from '@angular/core';

@Component({
  selector: 'app-signos-vitales',
  standalone: true,
  imports: [],
  templateUrl: './signos-vitales.component.html',
  styleUrl: './signos-vitales.component.css'
})
export class SignosVitalesComponent {

  title : string = "Signos Vitales";
  subtitle : string ="Informacion referente a signos vitales tomados recientemente.";

}
