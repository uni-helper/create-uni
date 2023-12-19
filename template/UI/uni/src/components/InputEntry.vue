<script setup>
import { ref } from 'vue'

const name = ref('')
const popup = ref()

function handleClick() {
  popup.value.open('top')
}
</script>

<template>
  <view class="input-box">
    <input
      v-model="name"
      placeholder="What's your name?"
    >
  </view>
  <view>
    <button :disabled="!name" @click="handleClick">
      Hello
    </button>
  </view>

  <uni-popup ref="popup" type="bottom">
    <text class="popup_label">
      Hello{{ `  ${name}` }} 👏
    </text>
  </uni-popup>
</template>

<style scoped lang="scss">
.input-box {
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
}
.popup_label {
  padding: 0.5rem 2rem;
  background: gray;
  border-radius: 8px;
}
</style>
