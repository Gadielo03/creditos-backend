import { Request, Response } from "express";
import { getErrorResponse } from "./utils";
import service from '../services/creditos';
import * as types from '../types/creditos';

const getCreditoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
    }

    try {
        const credito: types.Credito = await service.getCreditoById(id);
        return res.json(credito);
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error))
    }
}

const getAllCreditos = async (req: Request, res: Response) => {
    try {
        const allCreditos: types.Credito[] = await service.getAllCreditos();
        return res.json(allCreditos);
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error));
    }
}

const getCreditoByAlumno = async (req: Request, res: Response) => {
    const alu_id = req.params.id;

    if (!alu_id) {
        return res.status(400).json({ error: 'Parámetro alu_id es requierido' });
    }

    try {
        const creditos: types.Credito[] = await service.getCreditosByAlumno(alu_id);
        return res.json(creditos);
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error));
    }
}

const createCredito = async (req: Request, res: Response) => {
    const {
        alu_id,
        act_id,
        cred_fecha
    } = req.body;

    if (!alu_id && !act_id && !cred_fecha) {
        return res.status(400).json({ error: 'Los parámatros no estan completos (alu_id, act_id, cred_fecha)' });
    }

    try {
        const reqCredito: types.CreditoDB = {
            credito_id: -1,
            alu_id: alu_id,
            act_id: act_id,
            cred_fecha: cred_fecha
        }
        const newCredito: types.Credito = await service.createCredito(reqCredito);
        return res.json(newCredito);
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error));
    }
}

const updateCredito = async (req: Request, res: Response) => {
    const {
        credito_id,
        alu_id,
        act_id,
        cred_fecha
    } = req.body;

    if (!credito_id) {
        return res.status(400).json({ error: 'No se proporcionó credito_id' });
    }

    try {
        const creditoUpdate: types.CreditoDB = {
            credito_id: credito_id,
            alu_id: alu_id,
            act_id: act_id,
            cred_fecha: cred_fecha
        }

        const updated = await service.updateCredito(creditoUpdate);
        return res.json(updated);
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error));
    }
}

const deleteCredito = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID no proporcionado' });
    }

    try {
        const borrado = await service.deleteCredito(id);
        if (borrado) {
            return res.status(200).json({ message: `Borrado ${id}` });
        } else {
            return res.status(200).json({ message: `ID no encontrado` });
        }
    } catch (error: unknown) {
        return res.status(500).json(getErrorResponse(error));
    }
}

const creditoControllers = {
    getCreditoById,
    getAllCreditos,
    getCreditoByAlumno,
    createCredito,
    updateCredito,
    deleteCredito
}

export default creditoControllers;