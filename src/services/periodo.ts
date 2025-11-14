import { Periodo, PeriodoDB } from '../types/periodo';
import pool from './db';

const getAllPeriodos = async (): Promise<Periodo[]> => {
    const client = await pool.connect();

    try {
        const query = `
        SELECT per_id, per_inicio, per_fin, per_nombre
        FROM periodo
        ORDER BY per_inicio DESC`;

        const res = await client.query(query);
        const periodos: Periodo[] = res.rows.map((row: PeriodoDB) => ({
            id: row.per_id,
            inicio: row.per_inicio,
            fin: row.per_fin,
            nombre: row.per_nombre
        }));

        return periodos;
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

const createPeriodo = async (periodo: Partial<Periodo>): Promise<Periodo> => {
    const client = await pool.connect();
    if (!periodo.inicio || !periodo.fin || !periodo.nombre) {
        throw new Error('Missing required fields to create Periodo');
    }

    try {
        const query = `
            INSERT INTO periodo (per_inicio, per_fin, per_nombre)
            VALUES ($1, $2, $3)
            RETURNING per_id, per_inicio, per_fin, per_nombre
        `;
        const values = [periodo.inicio, periodo.fin, periodo.nombre];

        const res = await client.query(query, values);
        const row: PeriodoDB = res.rows[0];

        return {
            id: row.per_id,
            inicio: row.per_inicio,
            fin: row.per_fin,
            nombre: row.per_nombre
        };
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

const updatePeriodo = async (periodo: Periodo): Promise<Periodo> => {
    const periodoExits = (await getAllPeriodos()).filter(p => p.id === periodo.id);
    if (periodoExits.length === 0) {
        throw new Error(`Periodo with id ${periodo.id} does not exist`);
    }

    const client = await pool.connect();
    try {
        const query = `
        UPDATE periodo
        SET per_inicio = $1, per_fin = $2, per_nombre = $3
        WHERE per_id = $4
        RETURNING per_id, per_inicio, per_fin, per_nombre
        `;
        const values = [periodo.inicio, periodo.fin, periodo.nombre, periodo.id];
        const res = await client.query(query, values);
        const row: PeriodoDB = res.rows[0];

        return {
            id: row.per_id,
            inicio: row.per_inicio,
            fin: row.per_fin,
            nombre: row.per_nombre
        };
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

const deletePeriodo = async (id: number): Promise<boolean> => {
    const periodoExits = (await getAllPeriodos()).filter(p => p.id === id);
    if (periodoExits.length === 0) {
        throw new Error(`Periodo with id ${id} does not exist`);
    }

    const client = await pool.connect();
    try {
        const query = `DELETE FROM periodo WHERE per_id = $1`;
        const values = [id];
        await client.query(query, values);
        return true;
    } catch (error) {
        console.error('Database query error: ', error);
        throw error;
    } finally {
        client.release();
    }
}

const dataRetreive = {
    getAllPeriodos
}

const dataModify = {
    createPeriodo,
    updatePeriodo,
    deletePeriodo
}

const servicioPeriodo = {
    ...dataRetreive,
    ...dataModify
}

export default servicioPeriodo;