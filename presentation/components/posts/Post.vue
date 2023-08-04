<template>
  <div
    class="tw-w-full tw-rounded-md tw-bg-white tw-cursor-pointer transition-all tw-border tw-border-transparent hover:tw-border-gray-200 tw-transition-all"
  >
    <div class="tw-w-full tw-p-2 md:tw-p-3 tw-flex tw-flex-col tw-gap-y-2">
      <div>
        <v-img
          class="tw-w-full tw-h-24 md:tw-h-36 tw-object-cover tw-rounded-md"
          src="https://picsum.photos/1920/1080"
        />
      </div>
      <div class="tw-w-full tw-flex tw-flex-col tw-gap-y-1">
        <h3
          class="tw-font-semibold tw-text-sm md:tw-text-base tw-text-[#304050]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <span class="text-truncate-3 tw-text-[12px] tw-text-[#657280]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          accusamus pariatur. Ullam iusto obcaecati quod fugiat, quas quibusdam
          possimus ratione eligendi voluptate asperiores dolorum voluptatem
          deserunt molestias, dicta reiciendis et.
        </span>
        <span class="tw-text-sm tw-text-[#9A9FA5]">
          {{ new Date().toLocaleDateString('vi-VN') }}
        </span>
      </div>
    </div>
  </div>
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
