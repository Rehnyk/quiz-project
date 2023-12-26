import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const showTopics = async ({request, response, render}) => {
    const topics = await topicService.showTopics();

    const topicsWithQuestions = await Promise.all(
        topics.map(async (topic) => ({
            ...topic,
            numberOfQuestions: await questionService.countQuestions(topic.id),
        }))
    );

    render("quiz.eta", {
        topics: topicsWithQuestions,
    });
};

const findTopicById = async ({request, response, params, render}) => {
    const questions = await questionService.findQuestions(params.tId);

    if (!questions.length) {
        response.redirect(`/quiz/${params.tId}/questions/0`);
    } else {
        const num = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[num];
        console.log('QUESTION:', randomQuestion)

        response.redirect(`/quiz/${randomQuestion.topic_id}/questions/${randomQuestion.id}`);

    }
};

const showQuestion = async ({request, response, render, params}) => {
    if (parseInt(params.qId) === 0) {
        console.log('NO QUESTIONS')
        render("quizQuestion.eta");
    }

    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
        });
};

const sendAnswer = async ({request, response, render, user, params}) => {
    await optionService.addQuizAnswer(user.id, params.qId, params.oId);
    const option = await optionService.findOptionById(params.oId);

    if (option.is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
};

const correctAnswer = async ({request, response, render, params}) => {
    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            answer: "correct"
        });
};

const wrongAnswer = async ({request, response, render, params}) => {
    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            answer: "incorrect"
        });
};

export {showTopics, findTopicById, showQuestion, sendAnswer, correctAnswer, wrongAnswer};