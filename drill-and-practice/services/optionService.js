import { sql } from "../database/database.js";


const createOption = async (questionId, text, isCorrect) => {

    await sql`INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES (${questionId}, ${text}, ${isCorrect})`;
};

const showOptions = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const deleteOption = async (id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

export { createOption, showOptions, deleteOption };