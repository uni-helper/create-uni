<script setup>
function handleClickGithub() {
  if (window?.open) {
    window.open('https://github.com/uni-helper/create-uni')
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
  <view class="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400" @click="handleClickGithub">
    <image class="inline-block h-6 w-6" src="/static/github.svg" />
  </view>
</template>
