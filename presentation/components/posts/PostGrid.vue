<template>
  <div
    class="grid-layout p-2"
  >
    <post />
    <post />
    <post />
    <post />
    <post />
    <post />
    <post />
    <post />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Post from './Post.vue'

export default defineComponent({
  name: 'PostGrid',
  components: {
    Post,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
