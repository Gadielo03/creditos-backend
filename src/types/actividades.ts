import { Periodo } from './periodo';
import { Docente } from './docente';

export type Actividad = {
    act_id: string;
    act_nombre: string;
    act_semestre: string;
    act_creditos: number;
    act_hora_inicio: string;
    act_hora_fin: string;
    periodo: Periodo;
    docente: Docente;
};

export type ActividadDB = {
    act_id: string;
    act_nombre: string;
    act_semestre: number;
    act_creditos: number;
    act_hor_ini: string;
    act_hor_fin: string;
    per_id: number;
    doc_responsable: number;
};

export type ActividadRaw = {
    act_id: string;
    act_nombre: string;
    act_semestre: string;
    act_creditos: number;
    act_hor_ini: string;
    act_hor_fin: string;
    per_id: number;
    per_inicio: string;
    per_fin: string;
    per_nombre: string;
    doc_id: number;
    doc_nombre: string;
    doc_apellidos: string;
};
