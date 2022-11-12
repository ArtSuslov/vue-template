<template>
  <div class="test">
    <app-button
      scheme="flat"
      modification="border-circle"
      size="small"
      color="info"
      text="Click me!"
      @click="handleClick"
    />
  </div>
</template>
<script setup lang="ts">
import { AppButton } from '@/common'
const handleClick = () => {
  console.log(document.querySelector('meta[property="og:description"]'))
}
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute('content', 'testing prerender io')
</script>
<style lang="scss" scoped></style>
