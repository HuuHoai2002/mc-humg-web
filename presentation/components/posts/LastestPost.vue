<template>
  <div
    class="tw-w-full tw-border tw-border-gray-200 tw-bg-white tw-rounded-md tw-transition-all tw-duration-200 tw-cursor-pointer"
  >
    <div class="tw-p-2 md:tw-p-3 lg:tw-p-6">
      <div
        class="tw-flex tw-w-full tw-h-full tw-flex-col lg:tw-flex-row tw-justify-between tw-gap-2 md:tw-gap-4"
      >
        <div class="lg:tw-max-w-[40%] tw-select-none">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="250"
            src="https://picsum.photos/id/11/500/300"
            class="tw-rounded-md tw-object-cover"
          ></v-img>
        </div>
        <!-- <img src="https://humg.edu.vn/content/tintuc/PublishingImages/HTQT/uk-vn%20portsmouth%202023.jpg" class="w-full h-full tw-max-h-48 tw-object-cover" alt=""> -->
        <div class="tw-flex-1 tw-flex tw-flex-col tw-gap-y-2 md:tw-gap-y-5">
          <div class="tw-flex tw-items-center tw-justify-between">
            <v-chip color="success" outlined> Mới cập nhật </v-chip>
            <span class="tw-text-sm tw-text-[#9A9FA5]">
              {{ new Date().toLocaleDateString('vi-VN') }}
            </span>
          </div>

          <h2 class="tw-font-medium tw-text-[#304050]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum,
            corporis nesciunt?
          </h2>

          <span class="text-truncate-3 tw-text-[#657280]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
            temporibus libero a distinctio vel doloremque fugiat, inventore
            ullam similique itaque nemo. Nam provident saepe possimus ratione,
            cupiditate eum hic architecto.
          </span>

          <div class="tw-mt-auto tw-ml-auto tw-hidden md:tw-flex">
            <v-btn outlined text color="primary"> Xem thêm </v-btn>
          </div>
        </div>
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
