<script setup>
import { ref } from 'vue'

const name = ref('')
const popupShow = ref(false)

function handleClick() {
  popupShow.value = true
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
    <hy-button :disabled="!name" @click="handleClick">
      Hello
    </hy-button>
  </view>

  <hy-popup v-model="popupShow">
    Hello{{ `  ${name}` }} 👏
  </hy-popup>
</template>

<style scoped lang="scss">
.input-box {
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
}
</style>
