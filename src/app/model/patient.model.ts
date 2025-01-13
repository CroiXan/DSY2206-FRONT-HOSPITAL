export interface Patient {
    id?: number;
    rut?: string;
    password?: string;
    nombre?: string;
    apellidos?: string;
    email?: string;
    bornDate?: string; // Formato: 'dd-MM-yyyy'
}