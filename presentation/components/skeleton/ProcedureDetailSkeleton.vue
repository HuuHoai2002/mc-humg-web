<template>
  <div>
    <div class="tw-space-y-4">
      <skeleton class="tw-h-[88px]" />
      <div class="tw-space-y-7">
        <skeleton v-for="item in 8" :key="item" class="tw-h-14" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Skeleton from './Skeleton.vue'

export default defineComponent({
  components: { Skeleton },
})
</script>
