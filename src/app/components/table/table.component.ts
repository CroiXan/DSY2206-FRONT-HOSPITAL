import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() rows: any[] = [];
  @Input() label : string = "";
  noDataMessage:string="Registro no encontrado.";
}
