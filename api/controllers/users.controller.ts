import { createJWT, verifyAdmin, verifyJWT } from "../config/authentication";
import express, { Request, Response } from "express";
import UsuarioService from "../services/usuarios.service";
const routes = express.Router();

routes.post("/login", logar);
routes.post("/logout", verifyJWT, (_req: Request, res: Response) => {
    return res.status(200).json({ message: "deletar token front end" });
});

routes
    .post("/usuarios", criar())
    .put("/usuarios/:id", verifyJWT, editar)
    .delete("/usuarios/:id", verifyJWT, deletar);

routes
    .use(verifyJWT, verifyAdmin)
    .post("/admin", criar("Admin"))
    .put("/admin/:id", editar)
    .delete("/admin/:id", deletar);

export default routes;

async function logar(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
        const usuario = await UsuarioService.recuperarPorEmail(email);
        if (usuario && usuario.ativo && usuario.senha === senha) {
            return res.json({ auth: true, token: createJWT(usuario) });
        } else {
            return res.status(400).json({ message: "Login inválido!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
function criar(role?: string) {
    return async (req: Request, res: Response) => {
        const { email, nome, senha } = req.body;
        try {
            const usuario = await UsuarioService.criar(email, nome, senha, role);
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
}
async function editar(req: Request, res: Response) {
    const { id } = req.params;
    let changeRole = false;
    let newRole = null;

    if (!id) {
        return res.status(400).json({ message: "Request Invalido" });
    }    
    if (!(req.body.userId === Number(id) || req.body.role === "Admin")) {
        return res.status(401).json({ message: "Usuario sem permissão" });
    }
    if (req.body.role === "Admin") {
        changeRole = Boolean(req.body.changeRole);
        newRole = req.body.newRole;
    }
    const { email, nome, senha } = req.body;
    try {
        await UsuarioService.editar(
            Number(id),
            email,
            nome,
            senha,
            newRole,
            changeRole
        );
        return res
            .status(201)
            .json({message: "Usuario atualizado com sucesso" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
async function deletar(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Request Invalido" });
    }
    if (!(req.body.userId === Number(id) || req.body.role === "Admin")) {
        return res.status(401).json({ message: "Usuario sem permissão" });
    }
    try {
        await UsuarioService.desativar(Number(id));
        return res.status(201).json({ message: "Usuario excluido com sucesso" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
