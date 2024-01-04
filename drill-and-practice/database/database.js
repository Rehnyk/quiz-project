import { postgres } from "../deps.js";
import { load } from 'https://deno.land/std@0.210.0/dotenv/mod.ts';

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

export { sql };
