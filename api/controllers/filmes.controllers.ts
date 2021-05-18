import { verifyAdmin, verifyJWT } from "../config/authentication";
import express, { Request, Response } from "express";
import filmesService from "../services/filmes.service";
import usuariosService from "../services/usuarios.service";

const routes = express.Router();

routes
    .use(verifyJWT)
    .get("/filmes", listar)
    .get("/filmes/:id", recuperar)
    .post("/filmes", verifyAdmin, criar)
    .put("/filmes/:id/voto", votar);

export default routes;

async function listar(req: Request, res: Response) {
    const { nomeDiretor, nome, genero, autores, qt, pg }: any = req.query;
    try {
        const response = await filmesService.listar(
            nomeDiretor,
            nome,
            genero,
            autores,
            qt,
            pg
        );
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function recuperar(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Request Invalido" });
    }
    try {
        const filme = await filmesService.validar(Number(id));
        await filmesService.recuperarDetalhes(filme);
        return res.status(200).json(filme);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
async function criar(req: Request, res: Response) {
    const {
        autores,
        generos,
        diretores,
        titulo,
        videoUrl,
        imagemUrl,
        tituloDescricao,
        descricao
    }: any = req.body;
    try {
        const filme = await filmesService.criar(
            titulo,
            videoUrl,
            imagemUrl,
            tituloDescricao,
            descricao,
            autores,
            diretores,
            generos
        );
        return res.status(200).json(filme);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
async function votar(req: Request, res: Response) {
    const { id } = req.params;
    const { userId, nota } = req.body;
    try {
        const usuario = await usuariosService.Validar(userId);
        await filmesService.votar(Number(id), nota, usuario);
        return res.status(200).json({message : "votado com sucesso"});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
