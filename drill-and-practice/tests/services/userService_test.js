import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../../app.js";

import {
    addUser,
    findUserByEmail
} from "../../services/userService.js";

/*Deno.test("Function findUserByEmail returns user", async () => {
    await addUser('user1@mail.com', '123456');
    assertEquals( await findUserByEmail('user1@mail.com'), [{}]);
});

Deno.test("Function findUserByEmail returns error.", () => {
    assertEquals(findUserByEmail('user2@mail.com'), "Hello service world!");
});*/


Deno.test("GET request to / should return 'Hello world!'", async () => {
    const testClient = await superoak(app);
    await testClient.get("/").expect("Hello world!");
});