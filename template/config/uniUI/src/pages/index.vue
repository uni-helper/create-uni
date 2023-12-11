<script setup>
import { ref } from 'vue'
import Footer from '@/components/Footer.vue'

const title = ref('✨ Hello Uni App! ✨')
</script>

<template>
  <view class="main">
    <image
      alt="uni helper logo"
      src="/static/logo.svg"
      width="125" height="125"
    />
    <text class="title">
      {{ title }}
    </text>
  </view>

  <Footer />
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin-top: 2rem;
  font-size: 40rpx;
  font-weight: bold;
  color: #888;
}
</style>
