import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";


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


const findTopicById = async ({ request, response, params, render }) => {
    render("topic.eta", { topic: await topicService.findTopicById(params.id) });
};

const deleteTopic = async ({ request, response, params }) => {
    await topicService.deleteTopic(params.id);

    response.redirect("/");
};


export { createQuestion, };