import { Request, Response } from 'express';
import { CreateAlumnoPayload } from '../types/alumno';
import { getErrorResponse } from './utils';
import servicioAlumno from '../services/alumno';

const validateNumeroControl = (nctrl: string): boolean => {
    const nctrlRegex = /^(C|c)?[0-9]{8}$/;
    return nctrlRegex.test(nctrl);
}

const getHealth = async (req: Request, res: Response) => {
    try {
        const healthResponse = await servicioAlumno.getHealth();
        res.json(healthResponse);
    } catch (error: any) {
        console.error('health check error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const getById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID parameter is required' });
    }

    try {
        const alumnoData = await servicioAlumno.getById(id);
        if (!alumnoData.id) {
            return res.status(404).json({ error: 'Alumno not found' });
        }
        res.json(alumnoData);
    } catch (error: any) {
        console.error('getById error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const alumnos = await servicioAlumno.getAll();
        res.json(alumnos);
    } catch (error: any) {
        console.error('getAll error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const getAlumnos = async (req: Request, res: Response) => {
    const ids: string[] = req.body.ids;
    if (!Array.isArray(ids)) {
        return res.status(400).json({ error: 'IDs parameter must be an array' });
    }

    try {
        const alumnos = await servicioAlumno.getAlumnos(ids);
        res.json(alumnos);
    } catch (error: any) {
        console.error('getAlumnos error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const createAlumno = async (req: Request, res: Response) => {
    const { nctrl, nombres, apellidos } = req.body;
    if (!validateNumeroControl(nctrl)) {
        return res.status(400).json({ error: 'Invalid numero de control format' });
    }

    const alumno: CreateAlumnoPayload = {
        nctrl,
        nombres,
        apellidos
    }

    try {
        const newAlumno = await servicioAlumno.createAlumno(alumno);
        res.status(201).json(newAlumno);
    } catch (error: any) {
        console.error('createAlumno error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const updateAlumno = async (req: Request, res: Response) => {
    const alu_id = req.params.id;
    const { nctrl, nombres, apellidos } = req.body;
    if (!validateNumeroControl(nctrl)) {
        return res.status(400).json({ error: 'Invalid numero de control format' });
    }
    if (!alu_id) {
        return res.status(400).json({ error: 'id is required for update' });
    }

    const alumno: CreateAlumnoPayload = {
        nctrl,
        nombres,
        apellidos
    }

    try {
        const updatedAlumno = await servicioAlumno.updateAlumno(alu_id, alumno);
        res.status(200).json(updatedAlumno);
    } catch (error: any) {
        console.error('updateAlumno error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const deleteAlumno = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'ID parameter is required' });
    }

    try {
        const deletedId = await servicioAlumno.deleteAlumno(id);
        res.status(200).json({ id: deletedId });
    } catch (error: any) {
        console.error('deleteAlumno error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const getAllCreditosReport = async (req: Request, res: Response) => {
    try {
        const reports = await servicioAlumno.getAllCreditosReport();
        res.json(reports);
    } catch (error: any) {
        console.error('getAllCreditosReport error: ', error);
        res.status(500).json(getErrorResponse(error));
    }
}

const alumno = {
    getHealth,
    getById,
    getAll,
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    getAllCreditosReport
}

export default alumno;
