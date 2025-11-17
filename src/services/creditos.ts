import * as types from '../types/creditos';
import * as typesAlumno from '../types/alumno';
import * as typesAct from '../types/actividades';
import serviceAlumno from './alumno';
import serviceActividades from './actividades';
import pool from './db';

const getAllCreditos = async (): Promise<types.Credito[]> => {
    console.log('getAll service');
    const cliente = await pool.connect();

    try {
        const query = 'SELECT credito_id, alu_id, act_id, cred_fecha FROM creditos';
        const res = await cliente.query(query);
        console.log('rowCount', res.rowCount);

        const creditos: types.Credito[] = await Promise.all(
            res.rows.map(async (c: types.CreditoDB) => {
                try {
                    const [alu, act] = await Promise.all([
                        serviceAlumno.getById(c.alu_id),
                        serviceActividades.getActividadById(c.act_id)
                    ]);

                    return {
                        credito_id: c.credito_id,
                        cred_fecha: c.cred_fecha,
                        alumno: alu,
                        actividad: act
                    }
                } catch (error: unknown) {
                    console.error(`Error processing credito alu_id: ${c.alu_id} act_id: ${c.act_id}`);
                    throw error;
                }
            })
        )
        console.log('out');
        return creditos;
    } catch (error: unknown) {
        throw error;
    } finally {
        cliente.release()
    }
}

const getCreditosByAlumno = async (idAlumno: string): Promise<types.Credito[]> => {
    const cliente = await pool.connect();

    try {
        const query = 'SELECT credito_id, alu_id, act_id, cred_fecha FROM creditos WHERE alu_id = $1';
        const values = [idAlumno];
        const res = await cliente.query(query, values);

        const creditos: types.Credito[] = await Promise.all(
            res.rows.map(async (c: types.CreditoDB) => {
                try {
                    const [alu, act] = await Promise.all([
                        serviceAlumno.getById(c.alu_id),
                        serviceActividades.getActividadById(c.act_id)
                    ]);

                    return {
                        credito_id: c.credito_id,
                        cred_fecha: c.cred_fecha,
                        alumno: alu,
                        actividad: act
                    }
                } catch (error: unknown) {
                    console.error(`Error processing credito alu_id: ${c.alu_id} act_id: ${c.act_id}`);
                    throw error;
                }
            })
        );
        return creditos;
    } catch (error: unknown) {
        throw error;
    } finally {
        cliente.release();
    }
}

const getCreditoById = async (id: string): Promise<types.Credito> => {
    const cliente = await pool.connect();

    try {
        const query = 'SELECT credito_id, alu_id, act_id, cred_fecha FROM creditos WHERE credito_id = $1 LIMIT 1';
        const values = [id];
        const res = await cliente.query(query, values);

        if (res.rows.length === 0) {
            throw new Error('No hay registro con ese ID');
        }

        const creditoDb: types.CreditoDB = res.rows[0];

        const alumno: typesAlumno.Alumno = await serviceAlumno.getById(creditoDb.alu_id);
        const actividad: typesAct.Actividad = await serviceActividades.getActividadById(creditoDb.act_id);

        const credito: types.Credito = {
            credito_id: creditoDb.credito_id,
            alumno: alumno,
            actividad: actividad,
            cred_fecha: creditoDb.cred_fecha
        }
        console.log('credito', credito);
        return credito;
    } catch (error: unknown) {
        throw error;
    } finally {
        cliente.release();
    }
}

const createCredito = async (credito: types.CreditoDB): Promise<types.Credito> => {
    const cliente = await pool.connect();

    try {
        const query = 'INSERT INTO creditos(alu_id, act_id, cred_fecha) VALUES ($1, $2, $3) RETURNING credito_id';
        const values = [];
        values.push(credito.alu_id);
        values.push(credito.act_id);
        values.push(credito.cred_fecha);

        const res = await cliente.query(query, values);
        const newId = res.rows.length > 0 ? res.rows[0].credito_id : null;
        console.log(newId);
        console.log(typeof newId);
        if (!newId) {
            throw new Error('Error al crear el crédito');
        }

        return await getCreditoById(newId);
    } catch (error: unknown) {
        throw error;
    } finally {
        cliente.release()
    }
}

const updateCredito = async (credito: Partial<types.CreditoDB>): Promise<types.Credito> => {
    const cliente = await pool.connect();

    const updateValues: string[] = [];
    const updateParams: string[] = [];
    if (credito.act_id !== undefined) {
        updateParams.push(`act_id = $${updateParams.length + 1}`);
        updateValues.push(credito.act_id);
    }
    if (credito.alu_id !== undefined) {
        updateParams.push(`alu_id = $${updateParams.length + 1}`);
        updateValues.push(credito.alu_id);
    }
    if (credito.cred_fecha !== undefined) {
        updateParams.push(`cred_fecha = $${updateParams.length + 1}`);
        updateValues.push(credito.cred_fecha);
    }

    if (updateParams.length === 0 || credito.credito_id === undefined) {
        throw new Error('No se proporcionaron campos para actualizar o falta el ID de credito');
    }

    try {
        const qUpdate = `UPDATE Creditos SET ${updateParams.join(', ')} WHERE credito_id = $${updateParams.length + 1}`;
        console.log(qUpdate)
        updateValues.push(`${credito.credito_id}`);
        await cliente.query(qUpdate, updateValues);

        return await getCreditoById(`${credito.credito_id}`);
    } catch (error: unknown) {
        throw error;
    } finally {
        cliente.release();
    }
}

const deleteCredito = async (id: string): Promise<boolean> => {
    const cliente = await pool.connect();

    try {
        const query = 'DELETE FROM Creditos WHERE credito_id = $1 RETURNING credito_id';
        const values = [id];

        const res = await cliente.query(query, values);
        if (res.rows.length === 0) {
            return false;
        }
        return true;
    } catch (error: unknown) {
        throw error;
    } finally {
        cliente.release();
    }
}

const creditosDataRetrieval = {
    getCreditoById,
    getAllCreditos,
    getCreditosByAlumno
}

const creditosDataModify = {
    createCredito,
    updateCredito,
    deleteCredito
}

const creditosService = { ...creditosDataRetrieval, ...creditosDataModify }
export default creditosService;