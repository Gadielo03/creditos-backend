import { Request, Response } from 'express';
import { getErrorResponse } from './utils';
import servicioPeriodo from '../services/periodo';
import { Periodo } from '../types/periodo';

const getAllPeriodos = async (req: Request, res: Response) => {
    try {
        const periodos = await servicioPeriodo.getAllPeriodos();
        res.json(periodos);
    } catch (error: any) {
        console.error('getAllPeriodos error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const createPeriodo = async (req: Request, res: Response) => {
    const { inicio, fin, nombre } = req.body;
    if (!inicio || !fin || !nombre) {
        return res.status(400).json({ error: 'Missing required fields: inicio, fin, nombre' });
    }

    const periodoData = {
        inicio,
        fin,
        nombre
    };

    try {
        const newPeriodo = await servicioPeriodo.createPeriodo(periodoData);
        res.status(201).json(newPeriodo);
    } catch (error: any) {
        console.error('createPeriodo error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const updatePeriodo = async (req: Request, res: Response) => {
    const per_id = req.params.id;
    const { inicio, fin, nombre } = req.body;
    if (!per_id) {
        return res.status(400).json({ error: 'id is required for update' });
    }
    if (!inicio || !fin || !nombre) {
        return res.status(400).json({ error: 'Missing required fields: inicio, fin, nombre' });
    }

    const periodoData: Periodo = {
        id: parseInt(per_id),
        inicio,
        fin,
        nombre
    };

    try {
        const updatedPeriodo = await servicioPeriodo.updatePeriodo(periodoData);
        res.status(200).json(updatedPeriodo);
    } catch (error: any) {
        console.error('updatePeriodo error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const deletePeriodo = async (req: Request, res: Response) => {
    const per_id = req.params.id;
    const id = parseInt(per_id, 10);
    if (!id) {
        return res.status(400).json({ error: 'id is required for deletion' });
    }

    try {
        await servicioPeriodo.deletePeriodo(id);
        res.status(204).send();
    } catch (error: any) {
        console.error('deletePeriodo error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

export default {
    getAllPeriodos,
    createPeriodo,
    updatePeriodo,
    deletePeriodo
};