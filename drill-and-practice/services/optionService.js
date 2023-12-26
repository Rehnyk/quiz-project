import { sql } from "../database/database.js";


const createOption = async (questionId, text, isCorrect) => {
    await sql`INSERT INTO question_answer_options
      (question_id, option_text, is_correct) VALUES (${questionId}, ${text}, ${isCorrect})`;
};

const showOptions = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const deleteOption = async (id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const deleteAllQuestionOptions = async (qId) => {
    await sql`DELETE FROM question_answer_options WHERE question_id = ${qId}`;
};

const findOptionById = async (id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;
    return rows[0];
};

const addQuizAnswer = async (userId, qId, aId) => {
    await sql`INSERT INTO question_answers
      (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${qId}, ${aId})`;
};

export { createOption, showOptions, deleteOption, deleteAllQuestionOptions, findOptionById, addQuizAnswer };