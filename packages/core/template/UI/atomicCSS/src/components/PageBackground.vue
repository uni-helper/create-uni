<!--
  页面背景图案
  图案来自 Backdrop（https://mpbackdrop.netlify.app/），
  源码仓库：https://github.com/FliPPeDround/backdrop
-->
<template>
  <view class="min-h-screen w-full relative">
    <view
      class="
      absolute inset-0 z-0 [background:radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(34,197,94,0.25),transparent_70%),#000000]
    "
    />
    <div class="relative px-10 py-20 text-center">
      <slot />
    </div>
  </view>
</template>
