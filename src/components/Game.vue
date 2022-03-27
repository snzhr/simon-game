<template>
  <div class="game">
    <Button
      :class="b.class"
      v-for="b in buttons"
      :key="b.id"
      :clickedBtn="b.id === isClicked"
      @onClick="handleClick(b)"
      :isDisabled="getPCturn || gameOver || !gameStarted"
    />
    <div class="center">
      <div class="inner-center">
        <p v-show="gameOver" class="game-over">Game over!</p>
        <div class="points">
          <p>Score: {{ getScore }}</p>
          <p>Level: {{ level }}</p>
        </div>
        <div class="buttons">
          <button class="level-btn" @click="levelDown"></button>
          <button class="start" :disabled="gameStarted" @click="start"></button>
          <button class="level-btn" @click="levelUp"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Button from "./ui/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      buttons: [
        {
          id: 1,
          class: "top-left green",
          audio: new Audio(
            "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
          ),
        },
        {
          id: 2,
          class: "top-right red",
          audio: new Audio(
            "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
          ),
        },
        {
          id: 3,
          class: "bottom-left blue",
          audio: new Audio(
            "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
          ),
        },
        {
          id: 4,
          class: "bottom-right yellow",
          audio: new Audio(
            "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
          ),
        },
      ],
      isClicked: null,
      level: 1,
      gameOver: false,
      gameStarted: false,
    };
  },
  watch: {
    getGameSequence() {
      setTimeout(() => {
        this.setPCturn(true);
        this.checkData();
      }, 400);
    },
    getPlayerClicks(val) {
      if (val === this.getGameSequence.length && this.getGuess) {
        this.setPoints();
        this.randomSequence();
      }
      if (this.getGuess === false) {
        this.reset();
        this.gameOver = true;
        this.gameStarted = false;
        this.level = 1;
      }
    },
  },
  computed: {
    ...mapGetters([
      "getGameSequence",
      "getPCturn",
      "getGuess",
      "getScore",
      "getPlayerClicks",
    ]),
    delay() {
      if (this.level === 1) {
        return 1500;
      } else if (this.level === 2) {
        return 1000;
      } else {
        return 400;
      }
    },
  },
  methods: {
    ...mapMutations([
      "userClick",
      "setPCturn",
      "randomSequence",
      "setPoints",
      "reset",
    ]),
    start() {
      this.gameStarted = true;
      this.gameOver = false;
      this.randomSequence();
    },
    handleClick(btn) {
      this.userClick(btn.id);
      this.isClicked = btn.id;
      btn.audio.play();
      btn.audio.currentTime = 0;

      setTimeout(() => {
        this.isClicked = null;
      }, 100);
    },

    checkData() {
      let i = 0;
      let interval = setInterval(() => {
        if (i === this.getGameSequence.length) {
          clearInterval(interval);
          this.setPCturn(false);
        } else {
          this.isClicked = this.getGameSequence[i];
          const activeBtn = this.buttons.find((i) => i.id === this.isClicked);
          activeBtn.audio.play();
          activeBtn.audio.currentTime = 0;
          setTimeout(() => {
            this.isClicked = null;
          }, this.delay / 2);
        }
        i++;
      }, this.delay);
    },
    levelDown() {
      if (this.level > 1) {
        this.level -= 1;
      }
    },
    levelUp() {
      if (this.level < 3) {
        this.level += 1;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Teko&display=swap");
.game {
  display: grid;
  grid-template-columns: auto auto;
  position: relative;
  padding-top: 1.5em;
  font-family: "Teko", sans-serif;
}
.center {
  width: 50%;
  height: 50%;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-center {
  width: 90%;
  height: 90%;
  background-color: darkgrey;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1em 0;
}
.points {
  background-color: black;
  width: 70%;
  text-align: center;
  color: white;
  font-size: 2em;
  border-radius: 2em;
  padding: 0.2em 0;
}
.center button {
  margin-left: 1em;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: relative;
  text-align: center;
}
.level-btn {
  background-color: #ffd700;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.7) inset;
}
.start {
  background-color: #3cb371;
  box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.7) inset;
}
.game-over {
  color: brown;
  font-size: 2.5em;
  font-weight: 800;
}
</style>
