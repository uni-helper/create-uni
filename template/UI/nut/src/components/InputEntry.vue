<script setup>
import { ref } from 'vue'

const name = ref('')
const popupVisible = ref(false)

function handleClick() {
  popupVisible.value = true
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
    <nut-button :disabled="!name" block @click="handleClick">
      Hello
    </nut-button>
  </view>

  <nut-popup v-model:visible="popupVisible" :custom-style="{ padding: '30px 50px' }">
    Hello{{ `  ${name}` }} 👏
  </nut-popup>
</template>

<style scoped lang="scss">
.input-box {
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
}
</style>
