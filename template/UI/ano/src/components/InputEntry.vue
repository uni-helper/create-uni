<script setup>
import { ref } from 'vue'

const name = ref('')
const notify = ref()

function handleClick() {
  notify.value?.show({
    duration: 3000,
  })
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
    <AButton
      type="primary" block
      :disabled="!name"
      @click="handleClick"
    >
      Hello
    </AButton>
  </view>

  <ANotify ref="notify">
    <ANoticeBar type="primary">
      Hello{{ `  ${name}` }} 👏
    </ANoticeBar>
  </ANotify>
</template>
