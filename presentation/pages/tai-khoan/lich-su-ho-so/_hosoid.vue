<template>
  <div>
    <div class="tw-space-y-2 md:tw-space-y-4">
      <div
        class="tw-w-full bg-white tw-px-3 tw-py-1 tw-rounded-md tw-border tw-border-gray-200"
      ></div>
      <history-procedure />
    </div>
  </div>
</template>

<script setup lang="ts">
import HistoryProcedure from '../../../components/procedure/HistoryProcedure.vue'
</script>

<script lang="ts">
export default {
  name: 'HistoryProcedure',
  head: {
    title: 'Chi tiết lịch sử hồ sơ',
  },
}
</script>
