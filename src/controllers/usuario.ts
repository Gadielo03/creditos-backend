import { Request, Response } from 'express';
import servicioUsuario from '../services/usuario';

const login = async (req: Request, res: Response) => {
    try {
        const { nombre, contraseña } = req.body;
        console.log(nombre, contraseña);

        if (!nombre || !contraseña) {
            return res.status(400).json({
                success: false,
                message: 'Nombre y contraseña son requeridos',
                timestamp: new Date().toISOString()
            });
        }

        const loginResponse = await servicioUsuario.login(nombre, contraseña);
        res.json(loginResponse);
    } catch (error: any) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const usuario = {
    login
}

export default usuario;