import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";


const router = new Router();

router.get("/", mainController.showMain);

// TOPICS
router.get("/topics", topicController.showTopics);
router.post("/topics", topicController.createTopic);
router.get("/topics/:id", topicController.findTopicById);


//router.post("/topics/:id/delete", "");

//router.post("/topics/:id/questions", "");

//router.get("/topics/:id/questions/:qId", "");
//router.post("/topics/:id/questions/:qId/options", "");

//router.post("/topics/:tId/questions/:qId/options/:oId/delete", "");
//router.post("/topics/:tId/questions/:qId/delete", "");

// USER AUTHENTICATION
//router.get("/auth/register", "");
//router.post("/auth/register", "");
//router.get("/auth/login", "");
//router.post("/auth/login", "");


// QUIZ
//router.get("/quiz", "");
//router.get("/quiz/:tId", "");
//router.get("/quiz/:tId/questions/:qId", "");
//router.post("/quiz/:tId/questions/:qId/options/:oId", "");
//router.get("/quiz/:tId/questions/:qId/correct", "");
//router.get("/quiz/:tId/questions/:qId/incorrect", "");

//API
//router.get("api/questions/random", "");
//router.post("/api/questions/answer", "");



export { router };
