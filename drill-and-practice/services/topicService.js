import { sql } from "../database/database.js";

const createTopic = async (userId, name) => {
    await sql`INSERT INTO topics
      (user_id, name)
        VALUES (${userId}, ${name})`;
};

const showTopics = async () => {
    return await sql`SELECT * FROM topics ORDER BY name ASC`;
};

const findTopicById = async (id) => {
    const rows = await sql`SELECT * FROM topics WHERE id = ${id}`;
    return rows[0];
};

const deleteTopic = async (id) => {
   await sql`DELETE FROM topics WHERE id = ${id}`;
};


export { createTopic, showTopics, findTopicById, deleteTopic};