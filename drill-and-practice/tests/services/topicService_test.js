import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import {
    createTopic,
    showTopics,
    findTopicById,
    deleteTopic,
    countAllTopics
} from "../../services/topicService.js";

Deno.test("Function getHello returns 'Hello service world!'", () => {
    assertEquals(getHello(), "Hello service world!");
});