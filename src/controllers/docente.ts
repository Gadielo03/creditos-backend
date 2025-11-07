import { Request, Response } from 'express';
import servicioDocente from '../services/docente';
import { getErrorResponse } from './utils';

const getHealth = async (req: Request, res: Response) => {
    try {
        const healthResponse = await servicioDocente.getHealth();
        res.json(healthResponse);
    } catch (error: any) {
        console.error('health check error: ', error);
        res.status(500).json({
            success: false,
            message: error,
            timestampt: new Date().toISOString()
        });
    }
}

const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID paramter is required' })
    }

    try {
        const docenteData = await servicioDocente.getDocenteById(id);
        if (!docenteData.id) {
            return res.status(404).json({ error: 'Docente not found' })
        }
        res.json(docenteData)
    } catch (error: any) {
        console.error('getById error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const allDocentes = await servicioDocente.getAll();
        return res.json(allDocentes);
    } catch (error: any) {
        console.error('docentes~getAll error: ', error);
        res.status(500).json(getErrorResponse(error))
    }
}

const getDocentes = async (req: Request, res: Response) => {
    const ids: string[] = req.body.ids;
    if (!Array.isArray(ids)) {
        return res.status(400).json({ error: 'IDs parameter must be an array' });
    }

    try {
        const docentes = await servicioDocente.getDocentes(ids);
        res.json(docentes);
    } catch (error: any) {
        console.error('getDocentes error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const createDocente = async (req: Request, res: Response) => {
    const { nombre, apellidos } = req.body;

    try {
        const docente = await servicioDocente.createDocente({ nombre, apellidos });
        res.status(201).json(docente);
    } catch (error: any) {
        console.error('createDocente error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const updateDocente = async (req: Request, res: Response) => {
    const doc_id = req.params.id;
    const { nombre, apellidos } = req.body;

    try {
        const updatedDocente = await servicioDocente.updateDocente(doc_id, { nombre, apellidos });
        res.json(updatedDocente);
    } catch (error: any) {
        console.error('updateDocente error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const deleteDocente = async (req: Request, res: Response) => {
    const doc_id = req.params.id;
    if (!doc_id) {
        return res.status(400).json({ error: 'ID paramter is required' });
    }

    try {
        await servicioDocente.deleteDocente(doc_id);
        res.status(204).send();
    } catch (error: any) {
        console.error('deleteDocente error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const docente = {
    getHealth,
    getById,
    getAll,
    getDocentes,
    createDocente,
    updateDocente,
    deleteDocente
}

export default docente;
