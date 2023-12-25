import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js"
import * as optionController from "./controllers/optionController.js"
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";

const router = new Router();

router.get("/", mainController.showMain);

// TOPICS
router.get("/topics", topicController.showTopics);
router.post("/topics", topicController.createTopic);
router.get("/topics/:id", topicController.findTopicById);
router.post("/topics/:id/delete", topicController.deleteTopic);

// QUESTIONS
router.post("/topics/:id/questions", questionController.createQuestion);
router.get("/topics/:id/questions/:qId", questionController.findQuestionById);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

// ANSWER OPTIONS
router.post("/topics/:id/questions/:qId/options", optionController.createOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption);


// USER AUTHENTICATION
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", loginController.logoutUser)


// QUIZ
router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.findTopicById);
router.get("/quiz/:tId/questions/:qId", quizController.showQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.sendAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.wrongAnswer);

//API
//router.get("api/questions/random", "");
//router.post("/api/questions/answer", "");



export { router };
