import * as topicService from "../../services/topicService.js";

const createTopic = async ({request, response}) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    await topicService.createTopic(
        1,
        params.get("name"),
    );

    response.redirect("/topics");
};

const showTopics = async ({request, response, render}) => {
    render("topicsAll.eta", {topics: await topicService.showTopics()});
};

const findTopicById = async ({request, response, params, render}) => {
    render("topic.eta",
        {
            topic: await topicService.findTopicById(params.id),
            questions: await topicService.findQuestions(params.id)
        });
};

const deleteTopic = async ({request, response, params}) => {
    await topicService.deleteTopic(params.id);

    response.redirect("/topics");
};


export {createTopic, showTopics, findTopicById, deleteTopic};