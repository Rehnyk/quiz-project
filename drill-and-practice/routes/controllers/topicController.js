import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import {validasaur} from "../../deps.js";


const createTopic = async ({request, response, render}) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    const tName = params.get("name");

    const [passes, errors] = await validasaur.validate({value: tName}, {
        value: [validasaur.required, validasaur.minLength(1)]
    });

    if (!passes) {
        console.log('ERRORS:', errors)
        render("topicsAll.eta", {topics: await topicService.showTopics(),
            errors});
    } else {
        await topicService.createTopic(
            1,
            tName,
        );

        response.redirect("/topics");
    }
};

const showTopics = async ({request, response, render}) => {
    render("topicsAll.eta", {topics: await topicService.showTopics()});
};

const findTopicById = async ({request, response, params, render}) => {
    render("topic.eta",
        {
            topic: await topicService.findTopicById(params.id),
            questions: await questionService.findQuestions(params.id)
        });
};

const deleteTopic = async ({request, response, params}) => {
    await topicService.deleteTopic(params.id);

    response.redirect("/topics");
};


export {createTopic, showTopics, findTopicById, deleteTopic};