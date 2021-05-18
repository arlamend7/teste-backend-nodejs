import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "models/usuarios/usuario";

export function createJWT(usuario: Usuario) {
    return jwt.sign({ userId: usuario.id, role: usuario.role }, process.env.SECRET, {
        expiresIn: "4h"
    });
}
export function verifyJWT(req: Request, res: Response, next) {
    let token = req.headers.authorization as string;
    if (token) {
        token = token.split(" ")[1];
    } else {
        return res.status(401).end();
    }
    jwt.verify(token, process.env.SECRET, (err, payload: any) => {
        if (err) {
            return res.status(401).end();
        }
        req.body.userId = payload.userId;
        req.body.role = payload.role;
        next();
    });
}

export function verifyAdmin(req: Request, res: Response, next) {
    const role: string = req.body.role;
    if (role !== "Admin") {
        return res.status(403).end();
    }
    next();
}
