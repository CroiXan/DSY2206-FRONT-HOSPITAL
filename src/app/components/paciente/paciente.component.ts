import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
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


  constructor(
    private formBuilder: FormBuilder,
    private searchFormBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
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

    this.loadAcordion();
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
    this.accordionItems! =[
        {
          id: 0,
          label: "Registrar Paciente",
        },
        {
          id: 1,
          label: "Modificar Paciente",
        },
        {
          id: 2,
          label: "Eliminar Paciente",
        },
        {
          id: 3,
          label: "Fichas Paciente",
        }
      ];
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
    const userData = {
      rut,
      nombre,
      apellidos,
      email,
      bornDate: formattedBornDate,
      password,
    };
    console.log(userData);
    //validar accion segun accordion actionCrud se setea cuando apretamos el acordeon onSetAccordionChange()
    //aqui llamar servicio si post hacer post , si put actualizar, eliminar quizas no, y el buscar llamara  todos los pacientes y filtrar por rut aqui en front mientras
    console.log("this.actionCrud",this.actionCrud)

  }

  getPatients(){
    console.log("this.searchForm.value",this.searchForm.value);
    const { rut } = this.searchForm.value;
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
      this.actionCrud = "PUT";
    }
    else if ($event.target.innerText === 'Fichas Paciente'){
      this.actionCrud = "GET";
    }

    
  }

}
