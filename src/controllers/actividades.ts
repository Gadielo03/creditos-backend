import { Request, Response } from 'express';
import * as types from '../types/actividades';
import service from '../services/actividades';
import { getErrorResponse } from './utils';

const getAllActividades = async (req: Request, res: Response) => {
    try {
        const allActividades: types.Actividad[] = await service.getAllActividades();
        return res.json(allActividades);
    } catch (error: unknown) {
        res.status(500).json(getErrorResponse(error))
    }
}

const createActividad = async (req: Request, res: Response) => {
    const {
        act_nombre,
        act_semestre,
        act_creditos,
        act_hor_ini,
        act_hor_fin,
        per_id,
        doc_responsable
    } = req.body;

    if (!act_nombre || !act_semestre || !act_creditos || !act_hor_ini ||
        !act_hor_fin || !per_id || !doc_responsable) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear la actividad' });
    }

    const newActividadData: types.ActividadDB = {
        act_id: '',
        act_nombre,
        act_semestre,
        act_creditos,
        act_hor_ini,
        act_hor_fin,
        per_id,
        doc_responsable
    };

    try {
        const newAct: types.Actividad = await service.createActividad(newActividadData);
        return res.json(newAct);
    } catch (error: unknown) {
        res.status(500).json(getErrorResponse(error))
    }
};

const updateActividad = async (req: Request, res: Response) => {
    const actividad: Partial<types.ActividadDB> = req.body;
    if (!actividad.act_id) {
        return res.status(400).json({ error: 'El ID de la actividad es obligatorio' });
    }

    try {
        const updatedAct: types.Actividad = await service.updateActividad(actividad);
        return res.json(updatedAct);
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error))
    }
}

const getActividadById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID paramteter is required ' });
    }

    try {
        const actividades: types.Actividad = await service.getActividadById(id);
        return res.json(actividades);
    } catch (error: unknown) {
        res.status(500).json(getErrorResponse(error));
    }
};

const deleteActividad = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await service.deleteActividad(id);
        return res.json({ success: deleted })
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error))
    }
}

const actividades = {
    getAllActividades,
    createActividad,
    updateActividad,
    getActividadById,
    deleteActividad
}

export default actividades;