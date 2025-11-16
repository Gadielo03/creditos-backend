import * as types from '../types/actividades';
import { Docente } from '../types/docente';
import { Periodo } from '../types/periodo';
import pool from './db';

const QueryActividad = `
SELECT
    a.act_id        as act_id,
    a.act_nombre    as act_nombre,
    a.act_creditos  as act_creditos,
    a.act_hor_ini   as act_hor_ini,
    a.act_hor_fin   as act_hor_fin,
    a.per_id        as per_id,
    p.per_inicio    as per_inicio,
    p.per_fin       as per_fin,
    p.per_nombre    as per_nombre,
    d.doc_id        as doc_id,
    d.doc_nombre    as doc_nombre,
    d.doc_apellidos as doc_apellidos

FROM actividades    as a
INNER JOIN periodo  as p ON p.per_id = a.per_id
INNER JOIN docente  as d ON d.doc_id = a.doc_responsable
`;

const getAllActividades = async (): Promise<types.Actividad[]> => {
   const cliente = await pool.connect();
   const query = QueryActividad;
   try {
      const qActividades = await cliente.query(query);
      const actividades: types.Actividad[] = qActividades.rows.map((row: types.ActividadRaw) => {
         const periodo: Periodo = {
            id: row.per_id,
            inicio: row.per_inicio,
            fin: row.per_fin,
            nombre: row.per_nombre
         }

         const docente: Docente = {
            id: `${row.doc_id}`,
            nombre: row.doc_nombre,
            apellidos: row.doc_apellidos
         }

         return {
            act_id: row.act_id,
            act_nombre: row.act_nombre,
            act_creditos: row.act_creditos,
            act_hora_inicio: row.act_hor_ini,
            act_hora_fin: row.act_hor_fin,
            periodo: periodo,
            docente: docente
         }
      });

      return actividades;

   } catch (error: unknown) {
      throw error;
   } finally {
      cliente.release();
   }
}

const createActividad = async (act: types.ActividadDB): Promise<types.Actividad> => {
   const cliente = await pool.connect();

   const existingPeriodQuery = 'SELECT per_id FROM Periodo WHERE per_id = $1';
   const existingDocenteQuery = 'SELECT doc_id FROM Docente WHERE doc_id = $1';
   try {
      let query = await cliente.query(existingDocenteQuery, [act.doc_responsable]);
      if (query.rows.length == 0) {
         throw new Error('Docente inválido: No corresponde a ningun registro de la base de datos');
      }

      query = await cliente.query(existingPeriodQuery, [act.per_id]);
      if (query.rows.length == 0) {
         throw new Error('Periodo inválido: No corresponde a ningun registro de la base de datos');
      }

      const insertActividad = `
            INSERT INTO
                Actividades (act_nombre, act_creditos, act_hor_ini, act_hor_fin, per_id, doc_responsable)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING act_id
        `;

      const values = [];
      values.push(act.act_nombre);
      values.push(act.act_creditos);
      values.push(act.act_hor_ini);
      values.push(act.act_hor_fin);
      values.push(act.per_id);
      values.push(act.doc_responsable);

      query = await cliente.query(insertActividad, values);
      const newId = query.rows[0].act_id;
      const newAct: types.Actividad = await getActividadById(newId);
      if (!newAct) {
         throw new Error('Error al obtener la actividad recién creada');
      }
      return newAct;
   } catch (error: unknown) {
      throw error;
   } finally {
      cliente.release();
   }
};

const updateActividad = async (act: Partial<types.ActividadDB>): Promise<types.Actividad> => {
   const updateParams = [];
   const updateValues = [];
   const qExistingAct = 'SELECT act_id FROM Actividades WHERE act_id = $1'
   const cliente = await pool.connect();

   if (act.act_nombre !== undefined) {
      updateParams.push('act_nombre = $' + (updateParams.length + 1));
      updateValues.push(act.act_nombre);
   }
   if (act.act_creditos !== undefined) {
      updateParams.push('act_creditos = $' + (updateParams.length + 1));
      updateValues.push(act.act_creditos);
   }
   if (act.act_hor_ini !== undefined) {
      updateParams.push('act_hor_ini = $' + (updateParams.length + 1));
      updateValues.push(act.act_hor_ini);
   }
   if (act.act_hor_fin !== undefined) {
      updateParams.push('act_hor_fin = $' + (updateParams.length + 1));
      updateValues.push(act.act_hor_fin);
   }
   if (act.per_id !== undefined) {
      updateParams.push('per_id = $' + (updateParams.length + 1));
      updateValues.push(act.per_id);
   }
   if (act.doc_responsable !== undefined) {
      updateParams.push('doc_responsable = $' + (updateParams.length + 1));
      updateValues.push(act.doc_responsable);
   }

   if (updateParams.length === 0 || act.act_id === undefined) {
      throw new Error('No se proporcionaron campos para actualizar o falta el ID de la actividad');
   }

   try {
      const actividad_exists = await cliente.query(qExistingAct, [act.act_id]);
      if (actividad_exists.rows.length == 0) {
         throw new Error('Error: No hay ninguna actividad con el id proporcionado')
      }

      const qUpdate = `UPDATE Actividades SET ${updateParams.join(', ')} WHERE act_id = $${updateParams.length + 1}`;
      updateValues.push(act.act_id);
      await cliente.query(qUpdate, updateValues);

      const finalActividad: types.Actividad = await getActividadById(act.act_id);
      if (!finalActividad) {
         throw new Error('La actividad no fue encontrada después de la actualización')
      }

      return finalActividad;
   } catch (error: unknown) {
      throw error;
   } finally {
      cliente.release();
   }
}

const getActividadById = async (id: string): Promise<types.Actividad> => {
   const cliente = await pool.connect();
   const query = `${QueryActividad} WHERE a.act_id = $1`;
   const values = [id];

   try {
      const res = await cliente.query(query, values);
      if (res.rows.length === 0) {
         throw new Error('Actividad no encontrada');
      }

      const actividad: types.ActividadRaw = res.rows[0];
      const periodo: Periodo = {
         id: actividad.per_id,
         inicio: actividad.per_inicio,
         fin: actividad.per_fin,
         nombre: actividad.per_nombre
      };

      const docente: Docente = {
         id: `${actividad.doc_id}`,
         nombre: actividad.doc_nombre,
         apellidos: actividad.doc_apellidos
      };

      const actividadFinal: types.Actividad = {
         act_id: actividad.act_id,
         act_nombre: actividad.act_nombre,
         act_creditos: actividad.act_creditos,
         act_hora_inicio: actividad.act_hor_ini,
         act_hora_fin: actividad.act_hor_fin,
         periodo,
         docente
      };

      return actividadFinal;
   } catch (error: unknown) {
      throw error;
   } finally {
      cliente.release();
   }
};

const deleteActividad = async (id: string): Promise<boolean> => {
   const cliente = await pool.connect();
   const existingActQuery = 'SELECT act_id FROM Actividades WHERE act_id = $1';
   const query = 'DELETE FROM Actividades WHERE act_id = $1 RETURNING act_id';
   const values = [id];

   try {
      const existingAct = await cliente.query(existingActQuery, values);
      if (existingAct.rows.length === 0) {
         throw new Error('No existe ninguna actividad con el ID proporcionado');
      }

      const deletedId = await cliente.query(query, values);
      if (deletedId.rows.length === 0) {
         return false;
      }
      return true;
   } catch (error: unknown) {
      throw error;
   } finally {
      cliente.release();
   }
}

const actividadesDataRetrieval = {
   getAllActividades,
   getActividadById
};

const actividadesDataModify = {
   createActividad,
   updateActividad,
   deleteActividad
};

const actividadesService = { ...actividadesDataModify, ...actividadesDataRetrieval };
export default actividadesService;
