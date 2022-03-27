<template>
  <button class="btn" :disabled="isDisabled" @click="$emit('onClick')">
    <div :class="{ overlay: clickedBtn }"></div>
  </button>
</template>

<script>
export default {
  props: {
    clickedBtn: Boolean,
    isDisabled: Boolean,
  },
};
</script>

<style scoped>
.btn {
  padding: 10em;
  border: 15px solid black;
  cursor: pointer;
  position: relative;
  box-shadow: 0 6px 25px 10px rgba(0, 0, 0, 0.7) inset;
}
.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: inherit;
  position: absolute;
}
.red {
  background-color: rgb(255, 99, 71);
}
.green {
  background-color: rgb(60, 179, 113);
}
.yellow {
  background-color: rgb(218, 165, 32);
}
.blue {
  background-color: rgb(95, 158, 160);
}
.top-left {
  border-top-left-radius: 100%;
}
.top-right {
  border-top-right-radius: 100%;
}
.bottom-left {
  border-bottom-left-radius: 100%;
}
.bottom-right {
  border-bottom-right-radius: 100%;
}
</style>
