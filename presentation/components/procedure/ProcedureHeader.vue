<template>
  <h2 class="tw-font-medium tw-text-base md:tw-text-xl tw-text-blue-500">
    <slot></slot>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
