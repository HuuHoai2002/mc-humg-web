<template>
  <div>
    <app-banner />
    <div
      class="tw-mt-2 md:tw-mt-4 tw-space-y-2 md:tw-space-y-3 lg:tw-space-y-4"
    >
      <app-wrapper>
        <div class="tw-space-y-3 md:tw-space-y-5">
          <procedure-skeleton-list v-if="fetchState.pending" grid />
          <div
            v-if="!fetchState.error && procedures.length > 0"
            class="tw-mt-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 md:tw-gap-4"
          >
            <procedure
              v-for="procedure in procedures.slice(0, 6)"
              :key="procedure.id"
              :data="procedure"
            />
          </div>
          <div class="tw-flex tw-items-center tw-justify-center">
            <v-btn
              depressed
              height="40"
              text
              outlined
              color="primary"
              width="250px"
              nuxt
              to="/thu-tuc"
            >
              Xem tất cả
            </v-btn>
          </div>
        </div>
      </app-wrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useContext, useFetch } from '@nuxtjs/composition-api'
// eslint-disable-next-line
import { Procedure as IProcedure } from '~/domain/entites/Procedure'
import AppBanner from '../components/layouts/AppBanner.vue'
import AppWrapper from '../components/layouts/AppWrapper.vue'
import Procedure from '../components/procedure/Procedure.vue'
import ProcedureSkeletonList from '../components/skeleton/ProcedureSkeletonList.vue'

const { $axios } = useContext()

const procedures = ref<IProcedure[]>([])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fetch, fetchState } = useFetch(async () => {
  const response = await $axios.get('/api/ThuTuc')

  procedures.value = response.data.data.listData
})
</script>

<script lang="ts">
export default {
  head: {
    title: 'Trang chủ',
  },
  auth: false,
}
</script>
