<script setup>
import AppFooter from '@/components/AppFooter.vue'
import AppLogos from '@/components/AppLogos.vue'
import InputEntry from '@/components/InputEntry.vue'
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
