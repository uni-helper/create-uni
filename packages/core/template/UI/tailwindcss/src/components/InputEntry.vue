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
  <view class="m-4 border-b border-solid border-gray-500 p-2">
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

  <view v-show="show" class="fixed left-0 right-0 top-8">
    <text class="rounded-lg bg-gray-400 px-8 py-2">
      Hello{{ `  ${name}` }} 👏
    </text>
  </view>
</template>
