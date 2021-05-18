import express from "express";
import setRoutes from "./config/routes";
import { config } from "dotenv";
const app = express();
config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started at port ${port}!`);
});
