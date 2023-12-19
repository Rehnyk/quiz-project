import { sql } from "../database/database.js";


const createOption = async (questionId, text, isCorrect) => {
    await sql`INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES (${questionId}, ${text}, ${isCorrect})`;
};

const showOptions = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

/*
const findQuestionById = async (id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${id}`;
    return rows[0];
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM topics WHERE id = ${id}`;
};
*/



export { createOption, showOptions };