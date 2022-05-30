<template>
    <div>


        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-outline-secondary btn-sm" style="float:left" @click="$emit('return-to-title')">Home</button>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h4 v-if="gameMode == GameMode.Antonyms">Antonyms</h4>
                <h4 v-else-if="gameMode == GameMode.Synonyms">Synonyms</h4>
                <h4 v-else-if="gameMode == GameMode.Numbers">Times tables</h4>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <h3>Score: {{score}} / {{quizLength}}</h3>
                <h3>Time: {{timeTaken}}s</h3>
            </div>
        </div>

        <div class="row mt-5" v-if="incorrectGuesses.length > 0">
            <div class="col table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Question</th>
                            <th scope="col">Correct answer</th>
                            <th scope="col">Your guess</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(guess, idx) in incorrectGuesses" :key="idx">
                            <td>{{guess.question}}</td>
                            <td>{{guess.answer}}</td>
                            <td>{{guess.chosenAnswer}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col">
                <button type="button" class="btn btn-outline-secondary btn-lg mr-3" @click="$emit('restart-quiz')">Play again</button>
                <button type="button" class="btn btn-outline-secondary btn-lg" @click="$emit('return-to-title')">Return Home</button>
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
            incorrectGuesses: {
                required: true,
                type: Object
            },
            score: {
                required: true,
                type: Number
            },
            quizLength: {
                required: true,
                type: Number
            },
            timeTaken: {
                required: true
            },
        },

        emits: ['restart-quiz', 'return-to-title'],

        data() {
            return {
                GameMode,

            }
        },
        computed: {

        },
        methods: {



        }
    }
</script>