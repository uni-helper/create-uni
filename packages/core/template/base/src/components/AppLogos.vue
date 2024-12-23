<script setup>
</script>

<template>
  <view class="container">
    <view class="uni-helper-logo">
      <image class="uni-helper-logo__image" src="/static/logo.svg" />
      <text class="uni-helper-logo__label green">
        uni-helper
      </text>
    </view>
    <text class="link-bar">
      +
    </text>
    <view class="uni-helper-logo">
      <image class="uni-helper-logo__image" src="/static/vite.png" />
      <text class="uni-helper-logo__label purple">
        Vite
      </text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  display: inline-flex;
  font-size: 1.5rem;
  font-weight: 300;
  &:hover {
    .link-bar {
      transform: rotate(135deg);
    }
  }
}
.uni-helper-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  .uni-helper-logo__image {
    display: inline-block;
    height: 4.5rem;
    width: 4.5rem;
  }
  .uni-helper-logo__label {
    margin-top: -0.5rem;
  }
  .green {
    color: #22c55e;
  };
  .purple {
    color: #a855f7;
  }
}
.link-bar {
  color: #9ca3af;
  margin: auto 1em;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
