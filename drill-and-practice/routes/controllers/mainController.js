import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";


const showMain = async ({ render, user}) => {
  render("main.eta", {
    topics: await topicService.countAllTopics(),
    questions: await questionService.countAllQuestions(),
    answers: await optionService.countAllAnswers(),
    user
  });
};

const showAPI= async ({ render, user}) => {
  render("api.eta", {
    user
  });
};

export { showMain, showAPI };
