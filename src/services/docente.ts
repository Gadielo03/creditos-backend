import { Docente, DocenteDB, CreateDocentePayload } from '../types/docente';
import { HealthResponse } from '../types/consts';
import pool from './db';

export const getHealth = async (): Promise<HealthResponse> => {
    return {
        message: 'ok docente service',
        error: false
    }
}

export const getDocenteById = async (id: string): Promise<Docente> => {
    const query = 'SELECT doc_id, doc_nombre, doc_apellidos FROM docente WHERE doc_id = $1 LIMIT 1';
    const values = [id];

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        if (res.rows.length === 0) {
            return {} as Docente;
        }
        const row: DocenteDB = res.rows[0];
        return {
            id: row.doc_id,
            nombre: row.doc_nombre,
            apellidos: row.doc_apellidos
        }
    } catch (error) {
        console.error('Database query errors: ', error)
        throw error;
    } finally {
        client.release();
    }
}

export const getAll = async (): Promise<Docente[]> => {
    const query = 'SELECT * FROM docente';

    const client = await pool.connect()
    try {
        const res = await client.query(query)
        const docentes: Docente[] = res.rows.map((doc: DocenteDB) => ({
            id: doc.doc_id,
            nombre: doc.doc_nombre,
            apellidos: doc.doc_apellidos
        }));

        return docentes;
    } catch (error) {
        console.error('Database query error: ', error)
        throw error;
    } finally {
        client.release();
    }
}

export const getDocentes = async (ids: string[]): Promise<Docente[]> => {
    if (ids.length === 0) {
        return [];
    }

    const query = `SELECT doc_id, doc_nombre, doc_apellidos FROM docente WHERE doc_id = ANY($1)`;
    const values = [ids];

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        const docentes: Docente[] = res.rows.map((row: DocenteDB) => ({
            id: row.doc_id,
            nombre: row.doc_nombre,
            apellidos: row.doc_apellidos
        }));

        return docentes;
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const createDocente = async (payload: CreateDocentePayload): Promise<Docente> => {
    const query = 'INSERT INTO docente (doc_nombre, doc_apellidos) VALUES ($1, $2) RETURNING doc_id, doc_nombre, doc_apellidos';
    const values = [payload.nombre, payload.apellidos];

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        if (res.rows.length === 0) {
            throw new Error('Failed to create docente');
        }
        const row: DocenteDB = res.rows[0];
        return {
            id: row.doc_id,
            nombre: row.doc_nombre,
            apellidos: row.doc_apellidos
        };
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const updateDocente = async (id: string, docente: Partial<CreateDocentePayload>): Promise<Docente> => {
    const fields = [];
    const values = [];

    if (docente.nombre) {
        fields.push(`doc_nombre = $${fields.length + 1}`);
        values.push(docente.nombre);
    }
    if (docente.apellidos) {
        fields.push(`doc_apellidos = $${fields.length + 1}`);
        values.push(docente.apellidos);
    }

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const query = `UPDATE docente SET ${fields.join(', ')} WHERE doc_id = $${fields.length + 1} RETURNING doc_id, doc_nombre, doc_apellidos`;
    values.push(id);

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        if (res.rows.length === 0) {
            throw new Error('Docente not found');
        }
        const row: DocenteDB = res.rows[0];
        return {
            id: row.doc_id,
            nombre: row.doc_nombre,
            apellidos: row.doc_apellidos
        };
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const deleteDocente = async (id: string): Promise<string> => {
    const query = `DELETE FROM docente WHERE doc_id = $1`;
    const values = [id];

    const client = await pool.connect();
    try {
        await client.query(query, values);
        return id;
    } catch (error) {
        console.error('Database delete error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

const dataRetrieve = {
    getHealth,
    getDocenteById,
    getAll,
    getDocentes
}

const dataModify = {
    createDocente,
    updateDocente,
    deleteDocente
}

const servicioDocente = {
    ...dataRetrieve,
    ...dataModify
}

export default servicioDocente;
