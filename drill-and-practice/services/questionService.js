import { sql } from "../database/database.js";

const createQuestion = async (userId, topicId, text) => {
    await sql`INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES (${userId}, ${topicId}, ${text})`;
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



export { createQuestion };