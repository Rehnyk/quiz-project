import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

const test = Deno.env.get("TEST_ENVIRONMENT");

let message = "NOT TEST ENVIRONMENT";

if (test) {
  message = "TEST ENVIRONMENT";
}

console.log(message);

export { sql };
