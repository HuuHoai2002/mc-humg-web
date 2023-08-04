<template>
  <div class="">
    <div class="tw-space-y-2 md:tw-space-y-3">
      <v-breadcrumbs
        v-if="breadcrumbs.length > 0"
        :items="breadcrumbs"
        class="!tw-px-0 !tw-py-2"
      >
        <template #divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <h2 v-if="title" class="tw-font-medium tw-text-base md:tw-text-lg">
        {{ title }}
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

interface BreadcrumbsProps {
  text: string
  disabled: boolean
  to: string
  nuxt: boolean
}

export default defineComponent({
  name: 'AppWrapper',
  props: {
    title: {
      type: String,
      default: '',
    },
    breadcrumbs: {
      type: Array as PropType<BreadcrumbsProps[]>,
      default: () => [],
    },
  },
  setup() {
    return {}
  },
})
</script>
