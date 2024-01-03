import { postgres } from "../deps.js";
import { load } from 'https://deno.land/std@0.210.0/dotenv/mod.ts';

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  //when running app locally outside of Docker
  //we need to have .env file with proper postgres creds
  await load({
    export: true
  });
  sql = postgres({
    // Add your default database configuration here
    database: Deno.env.DB_NAME,
    user: Deno.env.DB_USER,
    password: Deno.env.DB_PASSWORD,
    hostname: Deno.env.DB_HOST,
    port: Deno.env.DB_PORT,
  });
}


export { sql };
