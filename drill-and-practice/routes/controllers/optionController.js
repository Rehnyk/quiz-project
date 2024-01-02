import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as topicService from "../../services/topicService.js";
import {validasaur} from "../../deps.js";

const createOption = async ({request, response, params, render, user}) => {
    const body = request.body({type: "form"});
    const formParams = await body.value;

    const isCorrectTruthy = [true, "true", 1, "1", "on"];
    const opText = formParams.get("option_text");

    const [passes, errors] = await validasaur.validate({value: opText}, {
            value: [validasaur.required, validasaur.minLength(1)]
        });

    if (!passes) {
        console.log('ERRORS:', errors)
        render("question.eta",{ question: await questionService.findQuestionById(params.qId),
            options: await optionService.showOptions(params.qId),
            topic: await topicService.findTopicById(params.id),
            errors,
            user});
    } else {
        await optionService.createOption(
            params.qId,
            opText,
            isCorrectTruthy.includes(formParams.get("is_correct"))
        );

        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

const deleteOption = async ({request, response, params}) => {
    await optionService.deleteOption(params.oId);

    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};


export {
    createOption,
    deleteOption
};