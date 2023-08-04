<template>
  <div>
    <app-wrapper
      :breadcrumbs="[
        { text: 'Trang chủ', disabled: false, to: '/', nuxt: true },
        {
          text: 'Tra cứu hồ sơ',
          disabled: true,
          to: '/tra-cuu',
          nuxt: true,
        },
      ]"
    >
      <procedure-skeleton-list v-if="fetchState.pending" />
      <div v-else-if="files.length > 0" class="tw-space-y-4">
        <history-procedure v-for="item in files" :key="item.id" :data="item" />
      </div>
      <div v-else>
        <div class="text-center">
          <v-icon size="100" color="grey lighten-1">
            mdi-file-search-outline
          </v-icon>
          <div class="text-h5 tw-mt-5">Không tìm thấy hồ sơ</div>
        </div>
      </div>
    </app-wrapper>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useContext,
  useFetch,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import { History } from '~/domain/entites/History'
import AppWrapper from '../components/layouts/AppWrapper.vue'
import HistoryProcedure from '../components/procedure/HistoryProcedure.vue'
import ProcedureSkeletonList from '../components/skeleton/ProcedureSkeletonList.vue'

const route = useRoute()
const { $axios } = useContext()

const files = ref<History[]>([])

const mhs = computed(() => route.value.query.mhs)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fetch, fetchState } = useFetch(async () => {
  const response = await $axios.$get(`/api/HoSo/create?create=${mhs.value}`)

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

watch(mhs, () => {
  if (route.value.path !== '/tra-cuu') return
  fetch()
})
</script>

<script lang="ts">
export default {
  head: {
    title: 'Lịch sử hồ sơ',
  },
  auth: false,
}
</script>
