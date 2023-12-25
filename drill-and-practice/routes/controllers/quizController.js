import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const showTopics = async ({request, response, render}) => {
    render("quiz.eta", {topics: await topicService.showTopics()});
};

const findTopicById = async ({request, response, params, render}) => {
    const questions = await questionService.findQuestions(params.tId);
    const num = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[num];
    console.log('QUESTION:', randomQuestion)

    response.redirect(`/quiz/${randomQuestion.topic_id}/questions/${randomQuestion.id}`);
};

const showQuestion = async ({request, response, render, params}) => {
    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
        });
};

export {showTopics, findTopicById, showQuestion};