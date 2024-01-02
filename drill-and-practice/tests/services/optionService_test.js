import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import {
    createOption,
    showOptions,
    deleteOption,
    deleteAllQuestionOptions,
    findOptionById,
    addQuizAnswer,
    findCorrectAnswer,
    countAllAnswers
} from "../../services/optionService.js";

Deno.test("Function getHello returns 'Hello service world!'", () => {
    assertEquals(getHello(), "Hello service world!");
});