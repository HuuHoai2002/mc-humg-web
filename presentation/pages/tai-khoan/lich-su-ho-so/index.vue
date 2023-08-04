<template>
  <div>
    <app-wrapper title="Lịch sử hồ sơ" class="tw-space-y-2 md:tw-space-y-4">
      <div
        class="tw-w-full bg-white tw-px-3 tw-py-1 tw-rounded-md tw-border tw-border-gray-200"
      >
        <v-tabs v-model="tab" show-arrows color="green">
          <v-tab v-for="item in tabItems" :key="item" class="!tw-normal-case">
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>
      <procedure-skeleton-list v-if="fetchState.pending" />
      <div v-else-if="files.length > 0 && tab === 0" class="tw-space-y-4">
        <history-procedure v-for="item in files" :key="item.id" :data="item" />
      </div>
      <div v-else-if="filterFiles.length > 0 && tab !== 0" class="tw-space-y-4">
        <history-procedure
          v-for="item in filterFiles"
          :key="item.id"
          :data="item"
        />
      </div>
      <div v-else>
        <div class="text-center">
          <span>Không tìm thấy hồ sơ</span>
        </div>
      </div>
    </app-wrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, useContext, useFetch, watch } from '@nuxtjs/composition-api'
import { History } from '~/domain/entites/History'
import AppWrapper from '../../../components/layouts/AppWrapper.vue'
import HistoryProcedure from '../../../components/procedure/HistoryProcedure.vue'
import ProcedureSkeletonList from '../../../components/skeleton/ProcedureSkeletonList.vue'

const tab = ref<number>(0)
const tabItems = ['Tất cả', 'Đã gửi', 'Đang xử lý', 'Hoàn thành', 'Bị từ chối']

const files = ref<History[]>([])
const filterFiles = ref<History[]>([])

const { $axios, $auth } = useContext()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fetch, fetchState } = useFetch(async () => {
  const response = await $axios.$get(
    `/api/HoSo/create?create=${$auth.user.data.ma_sv}`
  )

  const data = response.data.listData

  const filesIds = data.map((item: any) => item.thuTucId)

  const filesResponse = await Promise.all(
    filesIds.map((item: any) => $axios.$get(`/api/ThuTuc/${item}`))
  )

  files.value = data.map((item: any, index: number) => ({
    ...item,
    thuTuc: filesResponse[index].data,
  }))
})

watch(tab, () => {
  if (tab.value === 0) {
    filterFiles.value = files.value
  } else {
    filterFiles.value = files.value.filter(
      (item) => item.trangThai === tab.value - 1
    )
  }
})
</script>

<script lang="ts">
export default {
  middleware: ['auth'],
  head: {
    title: 'Lịch sử hồ sơ',
  },
}
</script>
