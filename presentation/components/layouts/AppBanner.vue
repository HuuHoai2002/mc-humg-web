<template>
  <v-carousel
    v-model="model"
    hide-delimiter-background
    hide-delimiters
    show-arrows-on-hover
    mandatory
    height="auto"
  >
    <v-carousel-item
      v-for="item in items"
      :key="item.image_url"
      target="_blank"
      :href="item.url"
    >
      <v-img
        :src="item.image_url"
        class="tw-w-full tw-h-full lg:tw-min-h-[350px]"
      />
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AppBanner',
  setup() {
    const model = ref<number | null>(null)

    const items = ref<{ image_url: string; url: string }[]>([
      {
        image_url:
          'https://humg.edu.vn/content/tintuc/PublishingImages/asset%204@2x.png',
        url: 'https://humg.edu.vn/tin-tuc/pages/chi-tiet.aspx?ItemID=8519',
      },
      {
        image_url:
          'https://humg.edu.vn/content/tintuc/PublishingImages/asset%202@3x.png',
        url: 'https://humg.edu.vn/tin-tuc/pages/chi-tiet.aspx?ItemID=8513',
      },
      {
        image_url:
          'https://humg.edu.vn/content/tintuc/PublishingImages/banner%20sv%20olympic.png',
        url: 'https://humg.edu.vn/tin-tuc/pages/chi-tiet.aspx?ItemID=8512',
      },
      {
        image_url:
          'https://humg.edu.vn/content/tintuc/PublishingImages/fix11.jpg',
        url: 'https://humg.edu.vn/tin-tuc/Pages/ban-tin-mo-dia-chat.aspx?ItemID=7874',
      },
    ])

    return { model, items }
  },
})
</script>

<style scoped></style>
