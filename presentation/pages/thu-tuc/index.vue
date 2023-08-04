<template>
  <div>
    <app-wrapper
      :breadcrumbs="[
        { text: 'Trang chủ', disabled: false, to: '/', nuxt: true },
        { text: 'Thủ tục', disabled: true, to: '/thu-tuc', nuxt: true },
      ]"
    >
      <div
        class="tw-w-full tw-flex md:tw-justify-start tw-justify-between tw-items-center tw-gap-x-5"
      >
        <div
          class="tw-w-full tw-flex-col md:tw-flex-row tw-flex tw-items-center tw-gap-y-3 tw-gap-x-5"
        >
          <div class="tw-w-full">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Tìm kiếm thủ tục"
              outlined
              dense
              hide-details
              :disabled="disabledSearchField"
            />
          </div>
          <div class="">
            <v-select
              v-model="selectedDepartment"
              color="primary"
              :items="units"
              item-value="name"
              label="Chọn phòng ban"
              clearable
              hide-details
              dense
              outlined
              item-text="name"
            ></v-select>
          </div>
        </div>
      </div>
      <div class="tw-space-y-3 md:tw-space-y-5">
        <div
          v-if="
            !fetchState.error &&
            !selectedDepartment &&
            procedures.data.length > 0 &&
            searchProcedures.data.length === 0
          "
          class="tw-mt-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 md:tw-gap-4"
        >
          <procedure
            v-for="procedure in procedures.data"
            :key="procedure.id"
            :data="procedure"
          />
        </div>
        <div
          v-if="
            departmentProcedures.data.length > 0 &&
            selectedDepartment &&
            searchProcedures.data.length === 0
          "
          class="tw-mt-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 md:tw-gap-4"
        >
          <procedure
            v-for="procedure in departmentProcedures.data"
            :key="procedure.id"
            :data="procedure"
          />
        </div>
        <div
          v-if="searchProcedures.data.length > 0"
          class="tw-mt-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 md:tw-gap-4"
        >
          <procedure
            v-for="procedure in searchProcedures.data"
            :key="procedure.id"
            :data="procedure"
          />
        </div>
        <div v-if="message">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="message"> </span>
        </div>
        <procedure-skeleton-list
          v-if="fetchState.pending || departmentProcedures.isLoading"
          grid
        />
        <!-- <div class="tw-flex tw-items-center tw-justify-center">
          <v-btn
            depressed
            height="40"
            text
            outlined
            color="primary"
            width="250px"
          >
            Xem thêm
          </v-btn>
        </div> -->
      </div>
    </app-wrapper>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  useContext,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
// eslint-disable-next-line
import { Procedure as IProcedure } from '~/domain/entites/Procedure'
import { Units as units } from '../../api/units'
import AppWrapper from '../../components/layouts/AppWrapper.vue'
import Procedure from '../../components/procedure/Procedure.vue'
import ProcedureSkeletonList from '../../components/skeleton/ProcedureSkeletonList.vue'

const { $axios } = useContext()

const message = ref<string>('')
const disabledSearchField = ref<boolean>(false)
const procedures = reactive<{
  data: IProcedure[]
}>({
  data: [],
})

const searchProcedures = reactive<{
  data: IProcedure[]
}>({
  data: [],
})

const departmentProcedures = reactive<{
  data: IProcedure[]
  isLoading: boolean
}>({
  data: [],
  isLoading: false,
})

const { fetchState } = useFetch(async () => {
  const response = await $axios.get('/api/ThuTuc')

  procedures.data = response.data.data.listData
})

watch(
  () => procedures.data,
  (value) => {
    if (value.length === 0) {
      message.value = 'Không có thủ tục nào. Vui lòng thử lại sau.'
      disabledSearchField.value = true
    }
  }
)

watch(
  () => departmentProcedures.data,
  (value) => {
    if (value.length === 0 && selectedDepartment.value !== null) {
      message.value = `Phòng ban <span class="tw-text-blue-500">"${selectedDepartment.value}"</span> không có thủ tục nào. Vui lòng thử lại sau.`
      disabledSearchField.value = true
    }
  }
)

const handleFilterDepartment = async (value: string) => {
  departmentProcedures.isLoading = true
  message.value = ''
  disabledSearchField.value = false
  const response = await $axios.get(`/api/ThuTuc/phongBan?phongBan=${value}`)
  departmentProcedures.data = response.data.data.listData
  departmentProcedures.isLoading = false
}

const selectedDepartment = ref<string>('')

watch(selectedDepartment, (value) => handleFilterDepartment(value))

const search = ref<string>('')

watch(
  search,
  (value) => {
    if (value.trim().length === 0) {
      searchProcedures.data = []

      return
    }

    if (departmentProcedures.data.length === 0 && procedures.data.length > 0) {
      searchProcedures.data = procedures.data.filter((procedure) =>
        procedure.tieuDe.toLowerCase().includes(value.toLowerCase())
      )
    } else if (
      departmentProcedures.data.length > 0 &&
      selectedDepartment.value.length > 0
    ) {
      searchProcedures.data = departmentProcedures.data.filter((procedure) =>
        procedure.tieuDe.toLowerCase().includes(value.toLowerCase())
      )
    } else {
      searchProcedures.data = []
    }
  },
  { immediate: true }
)
</script>

<script lang="ts">
export default {
  head: {
    title: 'Thủ tục',
  },
  auth: false,
}
</script>
