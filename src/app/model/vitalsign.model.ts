export interface VitalSign {
    id: number;
    idPaciente: number;
    frecuenciaCardiaca: number;
    frecuenciaRespiratoria: number;
    presionArterialSistolica: number;
    presionArterialDiastolica: number;
    temperaturaCorporal: number;
    saturacionOxigeno: number;
    instante: string;
  }