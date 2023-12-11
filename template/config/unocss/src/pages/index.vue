<script setup>
import { ref } from 'vue'
import Footer from '@/components/Footer.vue'

const title = ref('✨ Hello Uni App! ✨')
</script>

<template>
  <view flex="~ col" items-center justify-center>
    <image
      alt="uni helper logo"
      src="/static/logo.svg"
      width="125" height="125"
    />
    <text
      mt-2
      font="bold"
      text="6 #888"
    >
      {{ title }}
    </text>
  </view>
  <Footer />
</template>
