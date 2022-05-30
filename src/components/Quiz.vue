<template>
    <div>
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-outline-secondary btn-sm" style="float:left" @click="$emit('return-to-title')">Home</button>
                <div style="float:right; display: block">Remaining: {{remaining}}</div>
                <br />
                <div style="float:right; display: block" >Score: {{score}}</div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h3 v-if="gameMode == GameMode.Antonyms">Select the antonym</h3>
                <h3 v-else-if="gameMode == GameMode.Synonyms">Select the synonym</h3>
                <h3 v-else-if="gameMode == GameMode.Numbers">Solve</h3>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h1>{{question.question}}</h1>
            </div>
        </div>

        <div class="row">
            <div v-for="option in question.options" :key="option" class="col col-md-4 col-6 p-2">
                <button type="button" :class="buttonClass(option)" style="width:100%" @click="submitAnswer(option)">{{option}}</button>
            </div>
        </div>


    </div>
</template>

<style>

</style>

<script>
    import GameMode from '@/GameMode.js';

    export default {
        props: {
            gameMode: {
                required: true,
                type: Number
            },
            question: {
                required: true,
                type: Object
            },
            score: {
                required: true,
                type: Number
            },
            timer: {
                required: true
            },
            remaining: {
                required: true
            }
        },

        emits: ['submit-answer', 'return-to-title'],

        data() {
            return {
                GameMode,

                showAnswer: false,
                chosenAnswer: null,
                correctPauseTime: 500,
                incorrectPauseTime: 2000
            }
        },
        computed: {
            isCorrect() {
                return this.chosenAnswer == this.question.answer;
            }
        },
        methods: {
            resetState() {
                this.showAnswer = false;
                this.chosenAnswer = null;
            },

            submitAnswer(chosen) {
                if (this.showAnswer) {
                    return;
                }

                this.chosenAnswer = chosen;
                this.showAnswer = true;

                const timeout = this.isCorrect ? this.correctPauseTime : this.incorrectPauseTime;

                setTimeout(() => {
                    this.$emit('submit-answer', this.isCorrect, this.chosenAnswer);
                    this.resetState();
                }, timeout)
            },

            buttonClass(option) {
                var out = "btn ";
                if (this.showAnswer) {
                    if (option == this.question.answer) {
                        out += "btn-success"
                    }
                    else if (option == this.chosenAnswer) {
                        out += "btn-danger"
                    }
                    else {
                        out += "btn-light"
                    }
                }
                else {
                    out += "btn-outline-secondary"
                }
                return out;
            }
        }
    }
</script>