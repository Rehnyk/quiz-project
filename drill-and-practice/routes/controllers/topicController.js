import * as topicService from "../../services/topicService.js";

const createTopic = async ({ request, response }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    await topicService.createTopic(
        1,
        params.get("name"),
    );

    console.log(params);

    response.redirect("/topics");
};

const showTopics = async ({ request, response, render }) => {
    render("topicsAll.eta", { topics: await topicService.showTopics() });
};

const findTopicById = async ({ request, response, params, render }) => {
    render("topic.eta", { topic: await topicService.findTopicById(params.id) });
};

export { createTopic, showTopics, findTopicById };