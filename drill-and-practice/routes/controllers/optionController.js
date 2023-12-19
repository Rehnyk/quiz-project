import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";



const createOption = async ({ request, response, params }) => {
    const body = request.body({ type: "form" });
    const formParams = await body.value;

    const isCorrectTruthy = [true, "true", 1, "1", "on"];

    await optionService.createOption(
        params.qId,
        formParams.get("option_text"),
        isCorrectTruthy.includes(formParams.get("is_correct"))
    );

    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

const deleteOption = async ({request, response, params}) => {
    await optionService.deleteOption(params.oId);

    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};



export { createOption, deleteOption };