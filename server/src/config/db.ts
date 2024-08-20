import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env;


if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD || !PGPORT ){
    throw new Error('Missing required environment variables for db config');
}

const db = knex({
    client: "pg",
    connection:{
        host: PGHOST,
        database: PGDATABASE,
        user: PGUSER,
        password: PGPASSWORD,
        port: Number(PGPORT),
        ssl: {rejectUnauthorized: false},
    },
});

export {db};