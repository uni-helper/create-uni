<script setup>
import AppLogos from '@/components/AppLogos.vue'
import InputEntry from '@/components/InputEntry.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <view class="root-container">
    <AppLogos />
    <InputEntry />
    <AppFooter />
  </view>
</template>

<style scoped>
.root-container {
  padding: 5rem 2.5rem;
  text-align: center;
}
</style>
