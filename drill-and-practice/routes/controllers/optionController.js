import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";



const createOption = async ({ request, response, params }) => {
    const body = request.body({ type: "form" });
    const formParams = await body.value;

    await optionService.createOption(
        params.qId,
        formParams.get("option_text"),
        formParams.get("is_correct"),
    );

    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};



export { createOption };