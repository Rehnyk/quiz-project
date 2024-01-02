import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import {
    createQuestion,
    findQuestionById,
    findQuestions,
    deleteQuestion,
    deleteAllTopicQuestions,
    countTopicQuestions,
    countAllQuestions,
    findRandomQuestion,
    findRandomQuestionInTopic
} from "../../services/questionService.js";

Deno.test("Function getHello returns 'Hello service world!'", () => {
    assertEquals(getHello(), "Hello service world!");
});