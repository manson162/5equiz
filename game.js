const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [{
        question: "This is the 1st question?",
        choice1: "Question 1 - choice 1",
        choice2: "Question 1 - choice 2",
        choice3: "Question 1 - choice 3",
        choice4: "Question 1 - choice 4",
        answer: 1
    }, {
        question: "This is the 2nd question?",
        choice1: "Question 2 - choice 1",
        choice2: "Question 2 - choice 2",
        choice3: "Question 2 - choice 3",
        choice4: "Question 2 - choice 4",
        answer: 1
    }, {
        question: "This is the 3rd question?",
        choice1: "Question 3 - choice 1",
        choice2: "Question 3 - choice 2",
        choice3: "Question 3 - choice 3",
        choice4: "Question 3 - choice 4",
        answer: 1
    }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    })

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);


    });
});

startGame();