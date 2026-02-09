<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const visible = ref(false)

function handleClick() {
  visible.value = true
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
    <t-button
      block
      size="large"
      variant="outline"
      theme="primary"
      :disabled="!name"
      @click="handleClick"
    >
      Hello
    </t-button>
  </view>

  <t-popup
    :visible="visible"
    placement="bottom"
    @update:visible="visible = $event"
  >
    <view class="block block--bottom">
      Hello{{ `  ${name}` }} 👏
    </view>
  </t-popup>
</template>

<style scoped lang="scss">
.input-box {
  margin: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid gray;
}

.block {
  color: var(--td-text-color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 240px;
}
</style>
