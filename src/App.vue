<template>
  <div class="content">
    <Game></Game>
  </div>
</template>

<script>
import Game from "./components/Game.vue";
export default {
  name: "App",
  components: {
    Game,
  },
};
</script>
Navigation

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.content {
  width: 100vw;
  height: 100vh;
  background-color: darkgray;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
