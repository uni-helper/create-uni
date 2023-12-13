<template>
  <view class="container">
    <view class="uni-helper-logo">
      <image class="uni-helper-logo__image" src="/static/logo.svg" />
      <text class="uni-helper-logo__label green">
        uni-helper
      </text>
    </view>
    <svg class="link-bar" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
      <path fill="currentColor" d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" />
    </svg>
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
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #9ca3af;
  margin: auto 1rem;
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
