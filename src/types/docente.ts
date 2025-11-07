export type Docente = {
    id: string;
    nombre: string;
    apellidos: string;
}

export type DocenteDB = {
    doc_id: string;
    doc_nombre: string;
    doc_apellidos: string;
}

export type CreateDocentePayload = {
    nombre: string;
    apellidos: string;
}