<script setup>
import { ref } from 'vue'

const name = ref('')
const show = ref(false)

function handleClick() {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 3000)
}
</script>

<template>
  <view m4 p2 border="1px solid gray">
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

  <view v-show="show" fixed top-8 left-0 right-0>
    <text px8 py2 bg-gray rounded-1>
      Hello{{ `  ${name}` }} 👏
    </text>
  </view>
</template>
