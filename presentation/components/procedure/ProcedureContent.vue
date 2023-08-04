<template>
  <span class="tw-flex tw-items-center tw-gap-x-2 tw-text-sm">
    <span>
      {{ title }}
    </span>
    <span class="tw-font-medium">
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
