export type Alumno = {
    id: string;
    nctrl: string;
    nombres: string;
    apellidos: string;
}

export type AlumnoDB = {
    alu_id: string;
    alu_nctrl: string;
    alu_nombres: string;
    alu_apellidos: string;
}

export type CreateAlumnoPayload = {
    nctrl: string;
    nombres: string;
    apellidos: string;
}


export type AlumnoCreditosReport = {
    alumno: Alumno;
    totalCreditos: number;
    creditos: {
        docente: string;
        actividad: string;
        fecha: string;
        creditos: number;
    }[];
}