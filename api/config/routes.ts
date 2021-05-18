import { Express } from "express";
import userRoute from "../controllers/users.controller";
import filmesRoute from "../controllers/filmes.controllers";

export default (server: Express) => {
    server.use(userRoute);
    server.use(filmesRoute);    
};
