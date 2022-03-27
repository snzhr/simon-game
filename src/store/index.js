import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameSequence: [],
    pcTurn: false,
    playerScore: 0,
    guess: null,
    playerClick: 0,
  },
  mutations: {
    setPCturn(state, bool) {
      state.pcTurn = bool;
      state.playerSequence = [];
    },
    setPoints(state) {
      state.playerScore += 10;
      // if user guesses, reinitializing user clicks
      state.playerClick = 0;
    },
    reset(state) {
      // reset all data in state
      state.gameSequence = [];
      state.playerSequence = [];
      state.playerScore = 0;
      state.guess = null;
      state.playerClick = 0;
    },
    randomSequence(state) {
      const rand = Math.floor(Math.random() * (4 - 1 + 1) + 1);
      state.gameSequence.push(rand);
    },
    userClick(state, clickedButton) {
      // checking for if user guesses or not
      state.guess = state.gameSequence[state.playerClick] === clickedButton;
      state.playerClick += 1;
    },
  },
  actions: {},
  getters: {
    getGameSequence(state) {
      return state.gameSequence;
    },
    getPCturn(state) {
      return state.pcTurn;
    },
    getGuess(state) {
      return state.guess;
    },
    getScore(state) {
      return state.playerScore;
    },
    getPlayerClicks(state) {
      return state.playerClick;
    },
  },
});
