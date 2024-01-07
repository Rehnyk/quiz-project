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

const findTopicById = async ({request, response, params}) => {
    const question = await questionService.findRandomQuestionInTopic(params.tId);

    if (!question) {
        response.redirect(`/quiz/${params.tId}/questions/0`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${question.id}`);
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

const sendAnswer = async ({request, response, user, params}) => {
    await optionService.addQuizAnswer(user.id, params.qId, params.oId);
    const option = await optionService.findOptionById(params.oId);

    if (option.is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect?user_answer_id=${params.oId}`);
        // response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`)
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

    render("quizQuestion.eta",
        {
            question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            answerView: "incorrect",
            correctAnswers: correctAnswers,
            userAnswerId: queryParams.get("user_answer_id"),
            user
        });
};

export {
    showTopics,
    findTopicById,
    showQuestion,
    sendAnswer,
    correctAnswer,
    wrongAnswer
};