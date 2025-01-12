import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-sidebar',
  standalone: true,
  templateUrl: './hospital-sidebar.component.html',
  styleUrls: ['./hospital-sidebar.component.css']
})
export class HospitalSidebarComponent implements OnInit {
  collapsed = false;
  
  sidebarMenuItems: any[] = [
    { label: 'Dashboard', icon: 'bi-house-door', link: '/dashboard' },
    { label: 'Modulo Pacientes', icon: 'bi-person', link: '/paciente' },
    { label: 'Modulo Soporte', icon: 'bi-gear', link: '/soporte' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
}
