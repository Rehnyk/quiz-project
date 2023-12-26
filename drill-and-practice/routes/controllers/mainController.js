const showMain = ({ render}) => {
  render("main.eta", {
    topics: 20,
    questions: 60,
    answers: 250,
    correct: 100,
    incorrect: 150
  });
};

export { showMain };
