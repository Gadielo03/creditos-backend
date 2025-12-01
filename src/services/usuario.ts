import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../types/usuario';
import pool from './db';
import { get } from 'http';

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

export const createUser = async (name: string, password: string, roles: string[]): Promise<Usuario> => {
    const client = await pool.connect();
    if (name.length === 0 || password.length === 0) {
        throw new Error('Nombre y contraseña no pueden estar vacíos');
    }

    try {
        const checkIfExistsQuery = 'SELECT usuario_id FROM Usuarios WHERE usuario_nombre = $1 LIMIT 1';
        const existsResult = await client.query(checkIfExistsQuery, [name]);
        if (existsResult.rows.length > 0) {
            throw new Error('El nombre de usuario ya existe');
        }

        const saltRounds = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND) : 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const insertUserQuery = 'INSERT INTO usuarios (usuario_nombre, usuario_contraseña) VALUES ($1, $2) RETURNING usuario_id, usuario_nombre, usuario_contraseña';
        const userResult = await client.query(insertUserQuery, [name, hashedPassword]);
        const newUserId = userResult.rows[0].usuario_id;
        const getRolIdsQuery = `
            SELECT rol_id FROM roles WHERE rol_nombre = ANY($1)
        `;
        const rolIdsResult = await client.query(getRolIdsQuery, [roles]);
        if (rolIdsResult.rows.length === 0) {
            throw new Error('Roles inválidos');
        }

        const insertRolUsuarioQuery = 'INSERT INTO Roles_usuarios (usuario_id, rol_id) VALUES ($1, $2)';
        for (const row of rolIdsResult.rows) {
            await client.query(insertRolUsuarioQuery, [newUserId, row.rol_id]);
        }

        const newUser = await getUsuariosByIds(newUserId ? [newUserId] : []);
        return newUser[0];
    } catch (error) {
        console.error('Error en createUser:', error);
        throw new Error(error.message || 'Error al intentar crear el usuario');
    } finally {
        client.release();
    }
}

export const getAllUsers = async (): Promise<Usuario[]> => {
    const client = await pool.connect();

    try {
        const query = `
        SELECT u.usuario_id as id, u.usuario_nombre as nombre, array_agg(r.rol_nombre) as roles
        FROM Usuarios u
        INNER JOIN Roles_usuarios ru
        ON ru.usuario_id = u.usuario_id
        INNER JOIN Roles r
        ON r.rol_id = ru.rol_id
        GROUP BY u.usuario_id, u.usuario_nombre
        `;

        const res = await client.query(query);
        const usuarios: Usuario[] = res.rows.map((row) => {
            return {
                id: row.id,
                nombre: row.nombre,
                roles: row.roles
            }
        })
        return usuarios;
    } catch (error: any) {
        console.error('Error en getAllUsers:', error);
        throw new Error('Error al intentar obtener usuarios');
    } finally {
        client.release();
    }
}

export const getUsuariosByIds = async (ids: number[]): Promise<Usuario[]> => {
    if (ids.length === 0) {
        return [];
    }

    const client = await pool.connect();

    try {
        const query = `
        SELECT u.usuario_id as id, u.usuario_nombre as nombre, array_agg(r.rol_nombre) as roles
        FROM Usuarios u
        INNER JOIN Roles_usuarios ru
        ON ru.usuario_id = u.usuario_id
        INNER JOIN Roles r
        ON r.rol_id = ru.rol_id
        WHERE u.usuario_id = ANY($1)
        GROUP BY u.usuario_id, u.usuario_nombre
        `;
        const values = [ids];
        const res = await client.query(query, values);
        const usuarios: Usuario[] = res.rows.map((row) => {
            return {
                id: row.id,
                nombre: row.nombre,
                roles: row.roles
            }
        })
        return usuarios;
    } catch (error: any) {
        console.error('Error en getUsuariosByIds:', error);
        throw new Error('Error al intentar obtener usuarios por IDs');
    } finally {
        client.release();
    }
}

export const updateUserPassword = async (id: number, oldPassword: string, newPassword: string): Promise<Usuario> => {
    const client = await pool.connect();

    try {
        const usuario = await getUsuariosByIds([id]);
        if (usuario.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        const oldUser = usuario[0];

        const validOldPassword = await login(oldUser.nombre, oldPassword);
        if (!validOldPassword.success) {
            throw new Error('Contraseña antigua incorrecta');
        }

        const saltRounds = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND) : 10;
        const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);

        const query = 'UPDATE Usuarios SET usuario_contraseña = $1 WHERE usuario_id = $2 RETURNING usuario_id as id, usuario_nombre as nombre';
        const rows = await client.query(query, [hashedNewPassword, id]);
        const updatedUser: Usuario = {
            id: rows.rows[0].id,
            nombre: rows.rows[0].nombre
        };
        return updatedUser;
    } catch (error) {
        console.error('Error en updateUserPassword:', error);
        throw new Error('Error al intentar actualizar la contraseña del usuario');
    } finally {
        client.release();
    }
}

export const deleteUser = async (id: number): Promise<Boolean> => {
    const client = await pool.connect();

    try {
        const query = 'DELETE FROM Roles_usuarios WHERE usuario_id = $1';
        await client.query(query, [id]);

        const deleteUserQuery = 'DELETE FROM Usuarios WHERE usuario_id = $1';
        await client.query(deleteUserQuery, [id]);
        return true;
    } catch (error) {
        console.error('Error en deleteUser:', error);
        throw new Error('Error al intentar eliminar el usuario');
    } finally {
        client.release();
    }
}

const getRoles = async (): Promise<string[]> => {
    const client = await pool.connect();

    try {
        const query = 'SELECT rol_nombre FROM Roles';
        const res = await client.query(query);
        return res.rows;
    } catch (error) {
        console.error('Error en getRoles:', error);
        throw new Error('Error al intentar obtener roles');
    } finally {
        client.release();
    }
}

const updateUserInfo = async (user: Usuario): Promise<Usuario> => {
    const client = await pool.connect();

    try {
        if (user.nombre) {
            const query = 'UPDATE Usuarios SET usuario_nombre = $1 WHERE usuario_id = $2';
            await client.query(query, [user.nombre, user.id]);
        }
        if (user.roles) {
            const currentRolesQuery = 'SELECT rol_id, rol_nombre FROM roles';
            const res = await client.query(currentRolesQuery);
            const roles = res.rows;

            const validatedRoles = roles.filter(r => user.roles?.includes(r.rol_nombre));
            if (validatedRoles.length === 0) {
                throw new Error('Roles inválidos proporcionados');
            }
            const deleteRolesQuery = 'DELETE FROM Roles_usuarios WHERE usuario_id = $1';
            await client.query(deleteRolesQuery, [user.id]);

            const insertRoleQuery = 'INSERT INTO Roles_usuarios (usuario_id, rol_id) VALUES ($1, $2)';
            for (const role of validatedRoles) {
                await client.query(insertRoleQuery, [user.id, role.rol_id]);
            }
        }

        const queryUser = `
            SELECT u.usuario_id, u.usuario_nombre, array_agg(r.rol_nombre) as roles
            FROM usuarios AS u
            INNER JOIN roles_usuarios AS ru ON u.usuario_id = ru.usuario_id
            INNER JOIN roles AS r ON r.rol_id = ru.rol_id
            WHERE u.usuario_id = $1
            GROUP BY u.usuario_id, u.usuario_nombre
        `;

        const res = await client.query(queryUser, [user.id]);
        return {
            id: res.rows[0].usuario_id,
            nombre: res.rows[0].usuario_nombre,
            roles: res.rows[0].roles
        };

    } catch (error) {
        console.error('Error en updateUserInfo:', error);
        throw new Error('Error al intentar actualizar la información del usuario');
    } finally {
        client.release();
    }
}

const servicioUsuario = {
    login,
    verificarToken,
    createUser,
    getAllUsers,
    getUsuariosByIds,
    updateUserPassword,
    deleteUser,
    getRoles,
    updateUserInfo
}

export default servicioUsuario;
