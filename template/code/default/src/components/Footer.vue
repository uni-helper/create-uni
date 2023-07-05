<script setup>
import LogoGithub from './LogoGithub.vue'

function handleClickGithub() {
  if (window?.open) {
    window.open('https://github.com/uni-helper/vitesse-uni-app')
  }
  else {
    uni.showToast({
      icon: 'none',
      title: '请使用浏览器打开',
    })
  }
}
</script>

<template>
  <view class="footer">
    <LogoGithub @click="handleClickGithub"/>
  </view>
</template>

<style>
.footer{
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #888;
}
</style>
