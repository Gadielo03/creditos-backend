import { Request, Response, NextFunction } from 'express';
import servicioUsuario from '../services/usuario';

declare global {
    namespace Express {
        interface Request {
            usuario?: {
                id: number;
                nombre: string;
                roles: string[];
            }
        }
    }
}

export const verificarToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado',
                timestamp: new Date().toISOString()
            });
        }

        const datosUsuario = await servicioUsuario.verificarToken(token);
        req.usuario = datosUsuario;
        next();
    } catch (error: any) {
        console.error('Error al verificar token:', error);
        res.status(401).json({
            success: false,
            message: error.message || 'Token inválido',
            timestamp: new Date().toISOString()
        });
    }
};