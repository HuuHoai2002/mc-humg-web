<template>
  <nuxt-link
    :to="`/thu-tuc/${toSlug(data.tieuDe)}@${data.id}`"
    class="!tw-text-black"
  >
    <div
      class="tw-w-full tw-border tw-border-gray-200 tw-bg-white tw-rounded-md hover:tw-bg-blue-50 hover:tw-border-transparent active:tw-bg-blue-100 active:tw-scale-[0.99] tw-transition-all tw-duration-200 tw-cursor-pointer tw-select-none"
    >
      <div class="tw-p-2 md:tw-p-3 lg:tw-p-4">
        <div class="tw-flex tw-flex-col tw-items-start tw-gap-y-2">
          <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
            <procedure-header>
              {{ data.tieuDe }}
            </procedure-header>
            <procedure-content title="Thời gian xử lý: ">
              {{ data.thoiGianXuLy }} ngày
            </procedure-content>
          </div>
          <div>
            <span class="tw-font-medium tw-text-truncate">
              {{ data.noiDung }}
            </span>
          </div>
          <div
            class="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-y-2 lg:tw-flex-row tw-items-start tw-justify-between"
          >
            <span
              class="tw-flex tw-mt-auto tw-flex-wrap md:!tw-flex-nowrap tw-gap-x-2"
            >
              <span class="">Đơn vị tiếp nhận:</span>
              <span class="tw-font-medium">
                {{ data.donVi }}
              </span>
            </span>
            <!-- <v-btn color="primary" text outlined depressed> Chi tiết </v-btn> -->
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Procedure } from '../../../domain/entites/Procedure'
import ProcedureContent from './ProcedureContent.vue'
import ProcedureHeader from './ProcedureHeader.vue'

export default defineComponent({
  components: { ProcedureHeader, ProcedureContent },
  props: {
    data: {
      type: Object as PropType<Procedure>,
      required: true,
    },
  },
  setup() {
    return {
      toSlug: (value: string) => value.split(' ').join('-'),
    }
  },
})
</script>

<style scoped></style>
