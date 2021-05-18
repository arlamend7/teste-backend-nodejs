import path from "path";
import credencias from "../credenciais.json"

module.exports = {
    client: "mysql2",
    version: "5.7",
    connection: {
        host: "127.0.0.1",
        user: credencias.user,
        password: credencias.password,
        database: credencias.database
    },
    migrations: {
        directory: path.resolve(__dirname, "tables")
    },
    useNullAsDefault: true
};
