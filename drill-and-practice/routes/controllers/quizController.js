import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const showTopics = async ({request, response, render, user}) => {
    const topics = await topicService.showTopics();

    const topicsWithQuestions = await Promise.all(
        topics.map(async (topic) => ({
            ...topic,
            numberOfQuestions: await questionService.countTopicQuestions(topic.id)
        }))
    );

    render("quiz.eta", {topics: topicsWithQuestions, user});
};

const findTopicById = async ({request, response, params }) => {
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

const showQuestion = async ({request, response, render, params, user}) => {
    if (parseInt(params.qId) === 0) {
        render("quizQuestion.eta", user);
    }

    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            user
        });
};

const sendAnswer = async ({request, response, render, user, params}) => {
    await optionService.addQuizAnswer(user.id, params.qId, params.oId);
    const option = await optionService.findOptionById(params.oId);

    if (option.is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect?user_answer_id=${params.oId}`);
    }
};

const correctAnswer = async ({request, response, render, params, user}) => {
    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            answerView: "correct",
            user
        });
};

const wrongAnswer = async ({request, response, render, params, user}) => {
    const queryParams = request.url.searchParams;

    const correctAnswers = await optionService.findCorrectAnswer(params.qId);
    console.log(correctAnswers)
    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            answerView: "incorrect",
            correctAnswer: correctAnswers[0],
            userAnswerId: queryParams.get("user_answer_id"),
            user
        });
};

export {showTopics, findTopicById, showQuestion, sendAnswer, correctAnswer, wrongAnswer};