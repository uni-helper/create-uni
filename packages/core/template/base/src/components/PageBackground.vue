<!--
  页面背景图案
  图案来自 Backdrop（https://mpbackdrop.netlify.app/）
  源码仓库：https://github.com/FliPPeDround/backdrop
-->
<template>
  <view class="page">
    <view class="page-bg" />
    <div class="page-content">
      <slot />
    </div>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  width: 100%;
  position: relative;
}
.page-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 70%), #000000;
}
.page-content {
  position: relative;
  padding: 5rem 2.5rem;
  text-align: center;
  min-height: 100vh;
  z-index: 1;
}
</style>
