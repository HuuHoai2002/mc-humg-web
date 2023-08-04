<template>
  <div>
    <v-menu v-for="(menu, index) in navigations" :key="index" offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          height="40"
          text
          small
          class="!tw-no-underline"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>{{ menu.icon }}</v-icon>
          <span
            class="tw-text-sm !tw-font-medium !tw-normal-case tw-flex tw-items-center tw-gap-1"
          >
            {{ menu.title }}
            <v-icon size="20">mdi-chevron-down</v-icon>
          </span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(child_item, child_index) in menu.items"
          :key="child_index"
          nuxt
          :to="child_item.url"
          exact
          class="!tw-no-underline"
          @click="child_item?.onClick()"
        >
          <v-list-item-title>{{ child_item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { HeaderNavigationProps } from './layouts/AppHeader.vue'

export default defineComponent({
  name: 'NavigationList',
  props: {
    navigations: {
      type: Array as PropType<HeaderNavigationProps[]>,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
