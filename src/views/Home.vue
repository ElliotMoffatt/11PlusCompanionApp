<template>
    <div class="home container">
        <div id="TitlePage" v-if="currentPageState == PageState.Home">
            <h1>Gulliford Tutors Companion App</h1>
            <h5>Developed in partnership with Munkfish Games</h5>

            <div class="row mt-5">
                <div class="col">
                    <h4 style="display:block">
                        Select gamemode
                    </h4>

                    <div class="btn-group btn-group-toggle">
                        <label class="btn btn-outline-secondary" v-bind:class="{'active' : currentGameMode == GameMode.Synonyms}">
                            <input type="radio" name="options" autocomplete="off" checked :value="GameMode.Synonyms" v-model="currentGameMode"> Synonyms
                        </label>
                        <label class="btn btn-outline-secondary" v-bind:class="{'active' : currentGameMode == GameMode.Antonyms}">
                            <input type="radio" name="options" autocomplete="off" :value="GameMode.Antonyms" v-model="currentGameMode"> Antonyms
                        </label>
                        <!--<label class="btn btn-outline-secondary" v-bind:class="{'active' : currentGameMode == GameMode.Numbers}">
                            <input type="radio" name="options" autocomplete="off" disabled :value="GameMode.Numbers" v-model="currentGameMode"> Times Tables
                        </label>-->
                    </div>
                </div>
            </div>


            <div class="row mt-5">
                <div class="col">
                    <button type="button" class="btn btn-outline-success btn-lg" @click="startQuiz">Begin</button>
                </div>
            </div>
        </div>

        <Quiz v-if="currentPageState == PageState.Playing"
              :gameMode="currentGameMode"
              :question="currentQuestion"
              :score="score"
              :timer="runningTimer"
              :remaining="remaining"
              v-on:submit-answer="submitAnswer"
              v-on:return-to-title="returnToTitle"/>

        <EndScreen v-if="currentPageState == PageState.End"
              :gameMode="currentGameMode"
              :incorrectGuesses="incorrectGuesses"
              :score="score"
              :timeTaken="timeTaken"
              :quizLength="quizLength"
              v-on:restart-quiz="startQuiz"
              v-on:return-to-title="returnToTitle"/>

    </div>
</template>

<style>
    .home{
        padding:30px
    }
</style>

<script>
// @ is an alias to /src
    import Quiz from '@/components/Quiz.vue';
    import EndScreen from '@/components/EndScreen.vue';


    import GameMode from '@/GameMode.js';
    import NymsQuizManager from '@/NymsQuizManager.js';
    import { Question } from '@/Question.js';
    
    const PageState = {
        Home: 0,
        Playing: 1,
        End: 2
    }

export default {
        name: 'Home',
        components: {
            Quiz,
            EndScreen
        },
        data: function() {
            return {
                // make accessible in template
                PageState,
                GameMode,
                NymsQuizManager,

                // constants
                quizLength: 20,
                decoysCount: 5,

                // state

                currentPageState: PageState.Home,
                currentGameMode: GameMode.Synonyms,
                quizManager: new NymsQuizManager(),
                highscoreManager: null,         //TODO

                currentQuestionIdx: 0,
                incorrectGuesses: [],
                score: 0,
                startTime: new Date(),
                endTime: new Date(),
                timeTaken: 0,

            }
        },
        computed: {
            runningTimer() {
                return ((new Date().getTime() - this.startTime) / 1000).toFixed(2);
            },

            finishedTimer() {
                return ((this.endTime.getTime() - this.startTime.getTime()) / 1000).toFixed(2);
            },

            currentQuestion() {
                if (this.quizManager && this.quizManager.questions && this.quizManager.questions.length > 0) {
                    return this.quizManager.questions[this.currentQuestionIdx];
                }
                else {
                    return new Question("error", "error", []);
                }
            },

            remaining() {
                return this.quizManager.questions.length - this.currentQuestionIdx;
            }

        },
        watch: {
        },
        methods: {
            updateQuizManager() {
                if (this.currentGameMode == GameMode.Antonyms || this.currentGameMode == GameMode.Synonyms) {
                    this.quizManager = new NymsQuizManager(this.currentGameMode, this.quizLength, this.decoysCount);
                }
            },

            resetQuizState() {
                this.incorrectGuesses = [];
                this.currentQuestionIdx = 0;
                this.score = 0;
            },

            startQuiz() {
                this.resetQuizState();
                this.updateQuizManager();
                this.currentPageState = PageState.Playing;
                this.startTimer();
            },

            finishQuiz() {
                this.stopTimer();
                this.currentPageState = PageState.End;
            },

            returnToTitle() {
                this.stopTimer();
                this.currentPageState = PageState.Home;
            },

            startTimer() {
                this.startTime = new Date();
            },

            stopTimer() {
                this.endTime = new Date();
                this.timeTaken = ((this.endTime.getTime() - this.startTime.getTime()) / 1000).toFixed(2);
            },

            submitAnswer(isCorrect, chosenAnswer = null) {
                if (chosenAnswer != null) {
                    this.quizManager.questions[this.currentQuestionIdx].setChosenAnswer(chosenAnswer);
                }
                if (isCorrect) {
                    this.score++;
                }
                else {
                    this.incorrectGuesses.push(this.quizManager.questions[this.currentQuestionIdx]);
                }

                if (this.currentQuestionIdx >= this.quizManager.questions.length - 1) {
                    this.finishQuiz();
                }
                else {
                    this.currentQuestionIdx++;
                }
            }
        },
        mounted() {
            
        }
}
</script>
