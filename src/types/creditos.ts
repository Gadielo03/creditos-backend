import { Actividad } from "./actividades";
import { Alumno } from "./alumno";

export type CreditoDB = {
    credito_id: number;
    alu_id: string;
    act_id: string;
    cred_fecha: string;
}

export type Credito = {
    credito_id: number;
    alumno: Alumno;
    actividad: Actividad;
    cred_fecha: string;
}
