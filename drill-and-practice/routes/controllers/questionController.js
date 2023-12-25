import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as optionService from "../../services/optionService.js";
import {validasaur} from "../../deps.js";


const createQuestion = async ({ request, response, params, render }) => {
    const body = request.body({ type: "form" });
    const formParam = await body.value;

    const topicId =  params.id;
    const qText = formParam.get("question_text");

    const [passes, errors] = await validasaur.validate({value: qText}, {
        value: [validasaur.required, validasaur.minLength(1)]
    });

    if (!passes) {
        console.log('ERRORS:', errors)
        render("topic.eta",{ topic: await topicService.findTopicById(params.id),
            questions: await questionService.findQuestions(params.id),
            errors});
    } else {
        await questionService.createQuestion(
            1,
            topicId,
            qText,
        );

        response.redirect(`/topics/${topicId}`);
    }
};


const findQuestionById = async ({ request, response, params, render }) => {
    render("question.eta",
        { question: await questionService.findQuestionById(params.qId),
        options: await optionService.showOptions(params.qId),
        topic: await topicService.findTopicById(params.id)});
};

const deleteQuestion = async ({request, response, params}) => {
    await questionService.deleteQuestion(params.qId);

    response.redirect(`/topics/${params.tId}`);
};

export { createQuestion, findQuestionById, deleteQuestion};