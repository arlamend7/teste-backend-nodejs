import knex from "knex";
import credencias from "../../credenciais.json";

const connection = knex({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: credencias.user,
        password: credencias.password,
        database: credencias.database
    },
    useNullAsDefault: true
});

export default connection;
