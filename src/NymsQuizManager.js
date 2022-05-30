const synonyms = require('./assets/synonyms.json');
const antonyms = require('./assets/antonyms.json');
const decoys = require('./assets/decoys.json');
import GameMode from './GameMode.js';
import Question from './Question.js';
import { getRandomFromArray } from './RandomnessFunctions';

//export default class NymsQuizManager {
//    contructor(gameMode = GameMode.Synonyms, quizLength = 30, decoysCount = 5) {
//        console.log("contructor called")
//        this.gameMode = gameMode;
//        this.quizLength = quizLength;
//        this.questions = [];
//        this.decoys = decoys;
//        this.decoysCount = decoysCount;
//        this.dataset = this.gameMode == GameMode.Synonyms ? synonyms : antonyms;

//        this.createQuiz();
//    }

//    getQuestions() {
//        return this.questions;
//    }

//    createQuiz() {
//        this.questions = [];
//        while (this.questions.length < this.quizLength) {
//            this.createQuestion();
//        }
//        console.log('questions: ', this.questions)
//    }

//    createQuestion() {
//        var validQuestionCandidateFound = false;
//        var attemptsMade = 0
//        const maxAttempts = 50;
//        var questionCandidate = null;
//        while (!validQuestionCandidateFound && attemptsMade < maxAttempts) {
//            questionCandidate = getRandomFromArray(this.dataset);
//            // TODO: refine logic to prevent similar questions
//            validQuestionCandidateFound = true;
//        }

//        attemptsMade = 0;
//        var decoys = []

//        while (decoys.length < this.decoysCount && attemptsMade < maxAttempts) {
//            var decoyCandidate = getRandomFromArray(this.decoys);
//            if (decoyCandidate != questionCandidate.question
//                && decoyCandidate != questionCandidate.answer
//                && !questionCandidate.otherAnswers.includes(decoyCandidate)
//                && !decoys.includes(decoyCandidate)) {
//                decoys.push(decoyCandidate);
//            }
//        }

//        this.questions.push( new Question(questionCandidate.question, questionCandidate.answer, decoys))
//    }
//}

function NymsQuizManager(gameMode = GameMode.Synonyms, quizLength = 30, decoysCount = 5) {
    this.gameMode = gameMode;
    this.quizLength = quizLength;
    this.questions = [];
    this.decoys = decoys;
    this.decoysCount = decoysCount;
    this.dataset = this.gameMode == GameMode.Synonyms ? synonyms : antonyms;

    this.createQuiz();
}

NymsQuizManager.prototype.getQuestions = function () {
    return this.questions;
}

NymsQuizManager.prototype.createQuiz = function () {
    this.questions = [];
    while (this.questions.length < this.quizLength) {
        this.createQuestion();
    }
};

NymsQuizManager.prototype.createQuestion = function () {
    var validQuestionCandidateFound = false;
    var attemptsMade = 0
    const maxAttempts = 50;
    var questionCandidate = null;
    while (!validQuestionCandidateFound && attemptsMade < maxAttempts) {
        questionCandidate = getRandomFromArray(this.dataset);
        // TODO: refine logic to prevent similar questions
        validQuestionCandidateFound = true;
    }

    attemptsMade = 0;
    var decoys = []

    while (decoys.length < this.decoysCount && attemptsMade < maxAttempts) {
        var decoyCandidate = getRandomFromArray(this.decoys);
        if (decoyCandidate != questionCandidate.question
            && decoyCandidate != questionCandidate.answer
            && !questionCandidate.otherAnswers.includes(decoyCandidate)
            && !decoys.includes(decoyCandidate)) {
            decoys.push(decoyCandidate);
        }
    }

    this.questions.push(new Question(questionCandidate.question, questionCandidate.answer, decoys))
}

export default NymsQuizManager