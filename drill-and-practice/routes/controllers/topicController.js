import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import {validasaur} from "../../deps.js";


const createTopic = async ({request, response, render, user}) => {
    if (!user.admin) {
        response.status = 401
    } else {
        console.log('ONLY ADMIN SHOULD SEE THIS')


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
                user.id,
                tName,
            );

            response.redirect("/topics");
        }
    }
};

const showTopics = async ({request, response, render, user}) => {
    render("topicsAll.eta", {topics: await topicService.showTopics(), user});
};

const findTopicById = async ({request, response, params, render}) => {
    render("topic.eta",
        {
            topic: await topicService.findTopicById(params.id),
            questions: await questionService.findQuestions(params.id)
        });
};

const deleteTopic = async ({request, response, params, user}) => {

    if (!user.admin) {
        response.status = 401
    } else {
        console.log('ONLY ADMIN SHOULD SEE THIS')

        const topicQuestions = await questionService.findQuestions(params.id);

        for (const q of topicQuestions) {
            await optionService.deleteAllQuestionOptions(q.id)
        }

        await questionService.deleteAllTopicQuestions(params.id)
        await topicService.deleteTopic(params.id);

        response.redirect("/topics");
    }
};


export {createTopic, showTopics, findTopicById, deleteTopic};