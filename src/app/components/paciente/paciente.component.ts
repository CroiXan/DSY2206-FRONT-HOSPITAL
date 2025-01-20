import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../model/patient.model';
import { TableComponent } from '../table/table.component';
import {patientAccordion, patients} from '../../data/index';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, TableComponent, RouterOutlet],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css',
  providers: [DatePipe, RouterLink]
})
export class PacienteComponent {

  title:string = "Módulo Pacientes";
  subtitle:string = "Bienvenido al módulo de Gestión de Pacientes Aquí podrás gestionar los registros de pacientes y otras tareas relacionadas.";
  registroForm!: FormGroup;
  searchForm!: FormGroup;
  currentDate: string = "";
  accordionItems!: any[] | undefined;
  actionCrud: string ="";
  patientList? : any[] = undefined;
  childRoute : boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private searchFormBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private patientService: PatientService
  ) {
    // Inicialización del formulario con validaciones
    this.registroForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(3)]], 
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bornDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.searchForm = this.searchFormBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(3)]]
    });

    // Fecha actual en formato 'yyyy-mm-dd'
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.childRoute = false;
    this.loadAcordion();
    this.patientList = patients;
    console.log("this.patientList",this.patientList);
  }


  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (group: FormGroup) => {
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }

  isPatientFieldInvalid(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return control?.touched && control?.invalid || false;
  }

  isSearchFormInvalid(campo: string): boolean {
    const control = this.searchForm.get(campo);
    return control?.touched && control?.invalid || false;
  }
  

  loadAcordion()
  {
    this.accordionItems! = patientAccordion;
  }

  toggleAccordion(item: any, $event:any){
    item.show = !item.show;
    this.onSetAccordionChange($event);
  }

  submitForm() {
    const { rut, nombre, apellidos, email, bornDate, password, password2 } = this.registroForm.value;

    const currentDate = new Date();
    const formattedBornDate = this.datePipe.transform(bornDate, 'dd-MM-yyyy');
    const bornDateObj = new Date(bornDate);

    // Validar que la fecha de nacimiento no sea futura
    if (bornDateObj > currentDate) {
      console.error('La fecha de nacimiento no puede ser futura.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== password2) {
      console.error('Las contraseñas no coinciden.');
      return;
    }

    // preparar request paciente
    const userData: Patient = {
      rut,
      nombre,
      apellidos,
      email,
      bornDate: formattedBornDate!,
      password,
    };
    console.log(userData);
    //validar accion segun accordion actionCrud se setea cuando apretamos el acordeon onSetAccordionChange()
    //aqui llamar servicio si post hacer post , si put actualizar, eliminar quizas no, y el buscar llamara  todos los pacientes y filtrar por rut aqui en front mientras
    
    this.patientService.callAPI(this.actionCrud, userData, (data) => {
      console.log(JSON.stringify(data))
    });
    console.log("this.actionCrud",this.actionCrud)

  }

  getPatients(){
    console.log("this.searchForm.value",this.searchForm.value);
    const { rut } = this.searchForm.value;
    this.patientService.findByRut(rut, (data) => {
      console.log("data",data)

      if (data !== null && typeof data === 'object' && Object.keys(data).length > 0) {
        this.patientList = []; 
        this.patientList?.push(data);

        this.childRoute = true;
        this.router.navigate(['/paciente/signos']);

      } else {
        this.patientList = [];
      }


    });
  }

  onSetAccordionChange($event:any){
    console.log("$event.target.innerText",$event.target.innerText);
    if($event.target.innerText === 'Registrar Paciente'){
      this.actionCrud = "POST";
    }
    else if ($event.target.innerText === 'Modificar Paciente'){
      this.actionCrud = "PUT";
    }
    else if ($event.target.innerText === 'Eliminar Paciente'){
      this.actionCrud = "DELETE";
    }
    else if ($event.target.innerText === 'Fichas Paciente'){
      this.actionCrud = "GET";
    }

    
  }

}
