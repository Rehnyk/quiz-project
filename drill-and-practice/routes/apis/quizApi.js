import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js"

const findQuestion = async ({request, response}) => {
    const question = await questionService.findRandomQuestion();

    if (!question) {
        response.body = {};
    } else {
        const options = await optionService.showOptions(question.id);

        console.log('options:', options)
        for (let i = 0; i < options.length; i++) {
            delete options[i].question_id;
            delete options[i].is_correct;
            options[i] = {
                optionId: options[i].id,
                optionText: options[i].option_text
            };
        }

        response.body = {
            questionId: question.id,
            questionText: question.question_text,
            answerOptions: options
        };
    }
};

const checkAnswer = async ({request, response}) => {
    const body = request.body({ type: "json" });
    const doc= await body.value;

    const option = await optionService.findOptionById(doc.optionId);

    response.body = {
        correct: option.is_correct
    };
};

export {
    findQuestion,
    checkAnswer
}