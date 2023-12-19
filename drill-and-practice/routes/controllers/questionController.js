import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as optionService from "../../services/optionService.js";



const createQuestion = async ({ request, response, params }) => {
    const body = request.body({ type: "form" });
    const formParam = await body.value;

    const topicId =  params.id;

    await questionService.createQuestion(
        1,
        topicId,
        formParam.get("question_text"),
    );

    response.redirect(`/topics/${topicId}`);
};


const findQuestionById = async ({ request, response, params, render }) => {
    render("question.eta",
        { question: await questionService.findQuestionById(params.qId),
        options: await optionService.showOptions(params.qId)});
};

const deleteQuestion = async ({request, response, params}) => {
    await questionService.deleteQuestion(params.qId);

    response.redirect(`/topics/${params.tId}`);
};

export { createQuestion, findQuestionById, deleteQuestion};