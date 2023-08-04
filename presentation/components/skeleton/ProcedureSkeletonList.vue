<template>
  <div
    :class="grid && 'md:tw-grid-cols-2'"
    class="tw-grid tw-grid-cols-1 tw-gap-2 md:tw-gap-4"
  >
    <div
      v-for="i in 4"
      :key="i"
      class="tw-w-full tw-border tw-border-gray-200 tw-bg-white tw-rounded-md tw-transition-all tw-duration-200"
    >
      <div v-if="split" class="tw-p-2 md:tw-p-3 lg:tw-p-4 tw-space-y-2">
        <div
          class="tw-flex tw-flex-col md:tw-flex-row tw-w-full mobile:tw-gap-y-2 tw-justify-between"
        >
          <div class="tw-w-full md:tw-w-[90%] tw-flex tw-flex-col tw-gap-y-2">
            <skeleton class="tw-h-6 md:tw-h-7" />
            <skeleton class="tw-h-6" />
            <skeleton class="tw-h-6" />
          </div>
          <div class="tw-w-full tw-flex md:tw-justify-end tw-justify-start">
            <div class="tw-w-full md:tw-w-[90%] tw-flex tw-flex-col tw-gap-y-2">
              <skeleton class="tw-h-6 md:tw-h-7" />
              <skeleton class="tw-h-6" />
              <skeleton class="tw-h-6" />
            </div>
          </div>
        </div>
      </div>
      <skeleton v-else class="tw-h-56 md:tw-h-36" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Skeleton from './Skeleton.vue'

export default defineComponent({
  components: { Skeleton },
  props: {
    grid: {
      type: Boolean,
      default: false,
    },
    split: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
