////class Question {
////    contructor(question, answer, decoys) {
////        this.question = question;
////        this.answer = answer;
////        this.decoys = decoys;
////        this.options = this.decoys.concat([this.answer]);
////        this.chosenAnswer = null;
////        shuffleArray(this.options);
////    }

////    setChosenAnswer(chosen) {
////        this.chosenAnswer = chosen;
////    }
////}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function Question(question, answer, decoys) {
    this.question = question;
    this.answer = answer;
    this.decoys = decoys;
    this.options = this.decoys.concat([this.answer]);
    this.chosenAnswer = null;
    shuffleArray(this.options);
}

Question.prototype.setChosenAnswer = function (chosen) {
    this.chosenAnswer = chosen;
}

export default Question

