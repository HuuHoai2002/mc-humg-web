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
              {{ data.thuTuc.tieuDe }}
            </procedure-header>
            <procedure-content title="Thời gian tiếp nhận:">
              {{ new Date(`${data.createdAt}Z`).toLocaleString('vi-VN') }}
            </procedure-content>
            <procedure-content title="Đơn vị tiếp nhận:">
              {{ data.thuTuc.donVi }}
            </procedure-content>
          </div>
          <div class="tw-w-full tw-flex md:tw-justify-end tw-justify-start">
            <div class="tw-flex tw-flex-col tw-gap-y-2">
              <procedure-status :status="data.trangThai" />
              <procedure-content title="Thời gian xử lý:">
                {{ data.thuTuc.thoiGianXuLy }} ngày
              </procedure-content>
            </div>
          </div>
        </div>
        <div v-if="enableDetailButton">
          <v-btn
            small
            text
            color="primary"
            outlined
            class="!tw-normal-case !tw-cursor-pointer"
            @click="$emit('ClickDetail', data)"
          >
            Xem chi tiết
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { History } from '~/domain/entites/History'
import ProcedureContent from './ProcedureContent.vue'
import ProcedureHeader from './ProcedureHeader.vue'
import ProcedureStatus from './ProcedureStatus.vue'

export default defineComponent({
  components: { ProcedureContent, ProcedureHeader, ProcedureStatus },
  props: {
    data: {
      type: Object as PropType<History>,
      required: true,
    },
    enableDetailButton: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {}
  },
})
</script>

<style scoped></style>
