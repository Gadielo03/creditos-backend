import { Request, Response } from 'express';
import servicioUsuario from '../services/usuario';
import { Usuario } from '../types/usuario';

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

const createUser = async (req: Request, res: Response) => {
    try {
        const { nombre, contraseña, roles } = req.body;

        if (!nombre || !contraseña || !roles) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, contraseña y roles son requeridos',
                timestamp: new Date().toISOString()
            });
        }

        const nuevoUsuario = await servicioUsuario.createUser(nombre, contraseña, Array.isArray(roles) ? roles : [roles]);
        res.status(201).json(nuevoUsuario);
    } catch (error: any) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const usuarios = await servicioUsuario.getAllUsers();
        res.json(usuarios);
    } catch (error: any) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const getUsuarios = async (req: Request, res: Response) => {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
        return res.status(400).json({
            success: false,
            message: 'Se espera un arreglo de IDs',
            timestamp: new Date().toISOString()
        });
    }

    try {
        const usuarios = await servicioUsuario.getUsuariosByIds(ids);
        res.json(usuarios);
    } catch (error: any) {
        console.error('Error al obtener usuarios por IDs:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const updateUserPassword = async (req: Request, res: Response) => {
    const { id, contraseña, nuevaContraseña } = req.body;

    if (!id || !contraseña || !nuevaContraseña) {
        return res.status(400).json({
            success: false,
            message: 'ID, contraseña antigua y nueva contraseña son requeridos',
            timestamp: new Date().toISOString()
        });
    }

    try {
        const updatedUser = await servicioUsuario.updateUserPassword(id, contraseña, nuevaContraseña);
        res.json(updatedUser);
    } catch (error: any) {
        console.error('Error al actualizar la contraseña del usuario:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID es requerido',
            timestamp: new Date().toISOString()
        });
    }

    try {
        const result = await servicioUsuario.deleteUser(parseInt(id));
        res.json({
            success: result,
            message: result ? 'Usuario eliminado exitosamente' : 'No se pudo eliminar el usuario',
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await servicioUsuario.getRoles();
        res.json({
            success: true,
            roles,
            timestamp: new Date().toISOString()
        });
    } catch (error: any) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor',
            timestamp: new Date().toISOString()
        });
    }
}

const updateUserInfo = async (req: Request, res: Response) => {
    const { id, nombre, rol } = req.body;

    if (!id) {
        return res.status(400).json({
            message: 'ID es requerido'
        });
    }

    if (!nombre && !rol) {
        return res.status(400).json({
            message: 'Al menos un campo (nombre o rol) debe ser proporcionado para actualizar'
        });
    }

    const roles = Array.isArray(rol) ? rol : rol ? [rol] : undefined;
    const usuario: Usuario = {
        id,
        nombre: nombre || undefined,
        roles: roles
    }

    try {
        const updatedUser = await servicioUsuario.updateUserInfo(usuario);
        res.json(updatedUser);
    } catch (error: any) {
        console.error('Error al actualizar la información del usuario:', error);
        res.status(500).json({
            message: error.message || 'Error interno del servidor',
        });
    }
}

const usuario = {
    login,
    createUser,
    getAllUsers,
    getUsuarios,
    updateUserPassword,
    deleteUser,
    getRoles,
    updateUserInfo
}

export default usuario;