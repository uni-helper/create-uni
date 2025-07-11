<script setup>
import { ref } from 'vue'

const name = ref('')
const visible = ref(false)

function handleClick() {
  visible.value = true
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
    <SkButton
      type="primary" block
      :disabled="!name"
      @click="handleClick"
    >
      Hello
    </SkButton>
  </view>

  <SkToast v-model:visible="visible" :message="`Hello ${name} 👏`" />
</template>
