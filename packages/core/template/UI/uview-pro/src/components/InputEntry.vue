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
    <u-button :disabled="!name" type="primary" @click="handleClick">
      Hello
    </u-button>
  </view>

  <u-popup v-model="popupShow" mode="bottom" border-radius="14" height="300px">
    <view class="popup-box">
      Hello{{ `  ${name}` }} 👏
    </view>
  </u-popup>
</template>

<style scoped lang="scss">
.input-box {
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
}
.popup-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
}
</style>
