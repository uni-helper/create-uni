<script setup>
import Footer from '@/components/Footer.vue'

import { ref } from 'vue'
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
  <Footer/>
</template>
