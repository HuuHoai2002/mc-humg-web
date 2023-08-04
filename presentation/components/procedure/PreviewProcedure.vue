<template>
  <div>
    <div
      class="tw-w-full tw-border tw-border-gray-200 tw-bg-white tw-rounded-md tw-transition-all tw-duration-200"
    >
      <div class="tw-p-2 md:tw-p-3 lg:tw-p-4 tw-space-y-2">
        <div
          class="tw-flex tw-flex-col md:tw-flex-row tw-w-full mobile:tw-gap-y-2 tw-justify-between"
        >
          <div class="tw-w-full tw-flex tw-flex-col tw-gap-y-2">
            <procedure-header>
              {{ data.tieuDe }}
            </procedure-header>

            <procedure-content title="Đơn vị tiếp nhận:">
              {{ data.donVi }}
            </procedure-content>
          </div>
          <div class="tw-w-full tw-flex md:tw-justify-end tw-justify-start">
            <div class="tw-flex tw-flex-col tw-gap-y-2">
              <procedure-content title="Thời gian xử lý dự kiến:">
                {{ data.thoiGianXuLy }} ngày
              </procedure-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Procedure } from '../../../domain/entites/Procedure'
import ProcedureHeader from './ProcedureHeader.vue'
import ProcedureContent from './ProcedureContent.vue'

export default defineComponent({
  components: {
    ProcedureHeader,
    ProcedureContent,
  },
  props: {
    data: {
      type: Object as PropType<Procedure>,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
