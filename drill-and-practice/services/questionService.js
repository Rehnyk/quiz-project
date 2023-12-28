import { sql } from "../database/database.js";

const createQuestion = async (userId, topicId, text) => {
    await sql`INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES (${userId}, ${topicId}, ${text})`;
};

const findQuestionById = async (id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return rows[0];
};

const findQuestions = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const deleteQuestion = async (id) => {
    await sql`DELETE FROM questions WHERE id = ${id}`;
};

const deleteAllTopicQuestions = async (topicId) => {
    await sql`DELETE FROM questions WHERE topic_id = ${topicId}`;
};


const countTopicQuestions = async (topicId) => {
    const rows = await sql`SELECT COUNT (*) AS count FROM questions WHERE topic_id = ${topicId}`;
    return rows[0].count;
};

const countAllQuestions = async () => {
    const rows = await sql`SELECT COUNT (*) AS count FROM questions`;
    return rows[0].count;
};

const findRandomQuestion = async () => {
    const rows = await sql`SELECT * FROM questions ORDER BY random() LIMIT 1`;
    return rows[0];
};

const findRandomQuestionInTopic = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY random() LIMIT 1`;
    return rows[0];
};

export {
    createQuestion,
    findQuestionById,
    findQuestions,
    deleteQuestion,
    deleteAllTopicQuestions,
    countTopicQuestions,
    countAllQuestions,
    findRandomQuestion,
    findRandomQuestionInTopic
};