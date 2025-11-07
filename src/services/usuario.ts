import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../types/usuario';
import pool from './db';

const JWT_SECRET = process.env.JWT_SECRET;

export type LoginResponse = {
    success: boolean,
    token?: string,
    usuario?: Omit<Usuario, 'contraseña'>,
    message?: string
}

export const login = async (nombre: string, contraseña: string): Promise<LoginResponse> => {
    try {
        const result = await pool.query(
            'SELECT u.usuario_id, u.usuario_nombre, u.usuario_contraseña, array_agg(r.rol_nombre) as roles FROM Usuarios u JOIN Roles_usuarios ru ON u.usuario_id = ru.usuario_id JOIN Roles r ON ru.rol_id = r.rol_id WHERE u.usuario_nombre = $1 GROUP BY u.usuario_id, u.usuario_nombre, u.usuario_contraseña',
            [nombre]
        );

        if (result.rows.length === 0) {
            return {
                success: false,
                message: 'Usuario o contraseña incorrectos'
            };
        }

        const usuario = {
            id: result.rows[0].usuario_id,
            nombre: result.rows[0].usuario_nombre,
            contraseña: result.rows[0].usuario_contraseña,
            roles: result.rows[0].roles
        };

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return {
                success: false,
                message: 'Usuario o contraseña incorrectos'
            };
        }

        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, roles: usuario.roles },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { contraseña: _, ...usuarioSincontraseña } = usuario;

        return {
            success: true,
            token,
            usuario: usuarioSincontraseña
        };
    } catch (error) {
        console.error('Error en login:', error);
        throw new Error('Error al intentar iniciar sesión');
    }
}

export const verificarToken = async (token: string): Promise<{ id: number, nombre: string, roles: string[] }> => {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: number, nombre: string, roles: string[] };
    } catch (error) {
        throw new Error('Token inválido');
    }
}

const servicioUsuario = {
    login,
    verificarToken
}

export default servicioUsuario;
