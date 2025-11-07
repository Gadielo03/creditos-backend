import { Alumno, AlumnoDB, CreateAlumnoPayload } from '../types/alumno';
import { HealthResponse } from '../types/consts';
import pool from './db';

export const getHealth = async (): Promise<HealthResponse> => {
    return {
        message: 'ok',
        error: false
    }
}

export const getById = async (id: string): Promise<Alumno> => {
    const query = 'SELECT alu_id, alu_nctrl, alu_nombres, alu_apellidos FROM alumno WHERE alu_id = $1 LIMIT 1';
    const values = [id];

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        if (res.rows.length === 0) {
            return {} as Alumno;
        }
        const row = res.rows[0];
        return {
            id: row.alu_id,
            nctrl: row.alu_nctrl,
            nombres: row.alu_nombres,
            apellidos: row.alu_apellidos
        };
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const getAll = async (): Promise<Alumno[]> => {
    const query = 'SELECT alu_id, alu_nctrl, alu_nombres, alu_apellidos FROM alumno';

    const client = await pool.connect();
    try {
        const res = await client.query(query);
        const alumnos: Alumno[] = res.rows.map((row: AlumnoDB) => ({
            id: row.alu_id,
            nctrl: row.alu_nctrl,
            nombres: row.alu_nombres,
            apellidos: row.alu_apellidos
        }))

        return alumnos;
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const getAlumnos = async (ids: string[]): Promise<Alumno[]> => {
    if (ids.length === 0) {
        return [];
    }

    const query = `SELECT alu_id, alu_nctrl, alu_nombres, alu_apellidos FROM alumno WHERE alu_id = ANY($1)`;
    const values = [ids];

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        const alumnos: Alumno[] = res.rows.map((row: AlumnoDB) => ({
            id: row.alu_id,
            nctrl: row.alu_nctrl,
            nombres: row.alu_nombres,
            apellidos: row.alu_apellidos
        }))

        return alumnos;
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const createAlumno = async (alumno: CreateAlumnoPayload): Promise<string> => {
    const missingFields = [];
    if (!alumno.nctrl) missingFields.push('nctrl');
    if (!alumno.nombres) missingFields.push('nombres');
    if (!alumno.apellidos) missingFields.push('apellidos');

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const query = `INSERT INTO alumno (alu_nctrl, alu_nombres, alu_apellidos) VALUES ($1, $2, $3) RETURNING alu_id`;
    const values = [alumno.nctrl, alumno.nombres, alumno.apellidos];

    const client = await pool.connect();
    try {
        const res = await client.query(query, values);
        return res.rows[0].alu_id;
    } catch (error) {
        console.error('Database insert error: ', error);
        throw error;
    } finally {
        client.release();
    }

}

export const updateAlumno = async (id: string, alumno: Partial<CreateAlumnoPayload>): Promise<Alumno> => {
    const fields = [];
    const values = [];

    if (alumno.nctrl) {
        fields.push(`alu_nctrl = $${fields.length + 1}`);
        values.push(alumno.nctrl);
    }
    if (alumno.nombres && alumno.nombres.trim() !== '') {
        fields.push(`alu_nombres = $${fields.length + 1}`);
        values.push(alumno.nombres);
    }
    if (alumno.apellidos && alumno.apellidos.trim() !== '') {
        fields.push(`alu_apellidos = $${fields.length + 1}`);
        values.push(alumno.apellidos);
    }

    if (fields.length === 0) {
        throw new Error('No valid fields to update');
    }

    const query = `UPDATE alumno SET ${fields.join(', ')} WHERE alu_id = $${fields.length + 1}`;
    values.push(id);
    const client = await pool.connect();
    try {
        await client.query(query, values);

        const updatedAlumno = await getById(id);
        if (!updatedAlumno) {
            throw new Error('Alumno not found after update');
        }
        return updatedAlumno;
    } catch (error) {
        console.error('Database update error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

export const deleteAlumno = async (id: string): Promise<string> => {
    const query = `DELETE FROM alumno WHERE alu_id = $1`;
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
    getById,
    getAll,
    getAlumnos
}

const dataModify = {
    createAlumno,
    updateAlumno,
    deleteAlumno
}

const servicioAlumno = {
    ...dataRetrieve,
    ...dataModify
}

export default servicioAlumno;
