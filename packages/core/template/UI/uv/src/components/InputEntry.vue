<script setup>
import { ref } from 'vue'

const name = ref('')

const popup = ref()
function handleClick() {
  popup.value.open('bottom')
}
</script>

<template>
  <view class="input-box">
    <uv-input
      v-model="name"
      placeholder="What's your name?"
    />
  </view>
  <view>
    <uv-button
      type="primary"
      :disabled="!name"
      @click="handleClick"
    >
      Hello
    </uv-button>
  </view>

  <uv-popup ref="popup" round="25">
    <div class="popup-box">
      Hello{{ `  ${name}` }} 👏
    </div>
  </uv-popup>
</template>

<style scoped lang="scss">
.input-box {
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
}
.popup-box {
  color: black;
  height: 100px;
}
</style>
