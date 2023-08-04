<template>
  <div>
    <app-wrapper
      :breadcrumbs="[
        {
          text: 'Trang chủ',
          disabled: false,
          to: '/',
          nuxt: true,
          exact: true,
        },
        {
          text: 'Thủ tục',
          disabled: false,
          to: '/thu-tuc',
          nuxt: true,
          exact: true,
        },
        {
          text: 'Chi tiết thủ tục',
          disabled: true,
        },
      ]"
    >
      <div v-if="fetchState.pending">
        <procedure-detail-skeleton />
      </div>
      <div
        v-else-if="procedureDetail.data?.listThuTucThuocTinhs"
        class="tw-space-y-4"
      >
        <preview-procedure
          id="preview-procedure"
          :data="procedureDetail.data"
        />
        <create-form
          v-if="procedureDetail.data.listThuTucThuocTinhs"
          :on-submit="onSubmit"
          :data="procedureDetail.data.listThuTucThuocTinhs"
        />
      </div>
      <div v-else>
        <div class="tw-flex tw-items-center tw-justify-center tw-h-[300px]">
          <div class="tw-text-center">
            <h1 class="tw-text-xl md:tw-text-3xl tw-font-bold">
              Thủ tục này chưa có thông tin.
            </h1>
            <p class="tw-text-gray-500 tw-mt-2">Vui lòng quay lại sau.</p>
          </div>
        </div>
      </div>
    </app-wrapper>
    <div>
      <v-tour
        name="preview"
        :steps="toursPreview"
        :options="{ highlight: true }"
      >
        <template #default="tour">
          <transition name="fade">
            <v-step
              v-if="tour.steps[tour.currentStep]"
              :key="tour.currentStep"
              :step="tour.steps[tour.currentStep]"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
              :highlight="tour.highlight"
              class="!tw-bg-slate-700"
            >
              <div slot="actions">
                <div
                  class="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-x-2"
                >
                  <v-btn
                    depressed
                    height="30"
                    color="white darken-1"
                    text
                    class="!tw-normal-case"
                    @click="onTourSkip"
                  >
                    Bỏ qua
                  </v-btn>
                  <v-btn
                    v-if="tour.currentStep > 0"
                    depressed
                    height="30"
                    color="white"
                    text
                    class="!tw-normal-case"
                    @click="tour.previousStep"
                  >
                    Trước
                  </v-btn>
                  <v-btn
                    v-if="tour.currentStep < tour.steps.length - 1"
                    depressed
                    height="30"
                    color="white"
                    text
                    class="!tw-normal-case"
                    @click="tour.nextStep"
                  >
                    Sau
                  </v-btn>
                  <v-btn
                    v-if="tour.isLast"
                    depressed
                    height="30"
                    color="white"
                    text
                    class="!tw-normal-case"
                    @click="onTourFinish"
                  >
                    Hoàn thành
                  </v-btn>
                </div>
              </div>
            </v-step>
          </transition>
        </template>
      </v-tour>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  useContext,
  useFetch,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import Swal from 'sweetalert2'
import { ProcedureDetail } from '~/domain/entites/ProcedureDetail'
import CreateForm from '../../components/forms/CreateForm.vue'
import { IDataField } from '../../components/forms/type'
import AppWrapper from '../../components/layouts/AppWrapper.vue'
import PreviewProcedure from '../../components/procedure/PreviewProcedure.vue'
import ProcedureDetailSkeleton from '../../components/skeleton/ProcedureDetailSkeleton.vue'

const procedureDetail = reactive<{ data: ProcedureDetail }>({
  data: {} as ProcedureDetail,
})

const { $axios, $auth } = useContext()
const route = useRoute()
const router = useRouter()
const slug = computed(() => route.value.params.thutucid)
const id = computed(() => slug.value.split('@')[1])

const { fetchState } = useFetch(async () => {
  const response = await $axios.get(
    `/api/ThuTuc/${encodeURIComponent(id.value)}`
  )

  procedureDetail.data = response.data.data
})

// eslint-disable-next-line require-await
const onSubmit = async (data: IDataField[]) => {
  const _data = {
    // eslint-disable-next-line dot-notation
    createdBy: $auth.user.data.ma_sv as any,
    thuTucId: parseInt(id.value),
    hoSoThuocTinhDtos: data,
  }

  try {
    console.log(_data)
    const response = await $axios.$post('/api/HoSo', _data)

    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Nộp hồ sơ thành công.',
        confirmButtonText: 'Tiếp tục',
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          router.push('/tai-khoan/lich-su-ho-so')
        }
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Nộp hồ sơ thất bại. Vui lòng thử lại sau.',
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

const appInstance = getCurrentInstance()

watch(
  () => procedureDetail.data,
  (value) => {
    if (value.listThuTucThuocTinhs) {
      // eslint-disable-next-line dot-notation
      appInstance?.proxy['$tours'].preview.start()
    }
  }
)

onMounted(() => {
  // eslint-disable-next-line dot-notation
})

const onTourSkip = () => {
  // eslint-disable-next-line dot-notation
  appInstance?.proxy['$tours'].preview.skip()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const onTourFinish = () => {
  // eslint-disable-next-line dot-notation
  appInstance?.proxy['$tours'].preview.finish()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const toursPreview = [
  {
    target: '#preview-procedure', // We're using document.querySelector() under the hood
    header: {
      title:
        'Hướng dẫn nộp thủ tục tại <strong class="tw-text-blue-400">BPMC</strong>',
    },
    content:
      '<span class="tw-text-sm">Thông tin của thủ tục mà bạn chọn sẽ nằm ở đây.</span>',
    params: {
      placement: 'bottom',
      enableScrolling: true,
    },
    offset: -200,
  },
  {
    target: '#preview-procedure-detail',
    header: {
      title:
        'Hướng dẫn nộp thủ tục tại <strong class="tw-text-blue-400">BPMC</strong>',
    },
    content:
      '<span class="tw-text-sm">Bạn cần điền đầy đủ những thông tin này. Kể cả phần bên dưới.</span>',
    params: {
      placement: 'bottom',
      enableScrolling: true,
    },
    offset: -300,
  },
  {
    target: '#preview-procedure-btn-reset',
    header: {
      title:
        'Hướng dẫn nộp thủ tục tại <strong class="tw-text-blue-400">BPMC</strong>',
    },
    content:
      '<span class="tw-text-sm">Ấn vào đây nếu bạn muốn đặt lại dữ liệu cũ.</span>',
    params: {
      placement: 'top',
      enableScrolling: true,
    },
  },
  {
    target: '#preview-procedure-btn-continue',
    header: {
      title:
        'Hướng dẫn nộp thủ tục tại <strong class="tw-text-blue-400">BPMC</strong>',
    },
    content:
      '<span class="tw-text-sm">Ấn vào đây để hoàn thành, xác nhận và gửi thủ tục.</span>',
    params: {
      placement: 'top',
      enableScrolling: true,
    },
  },
]
</script>

<script lang="ts">
export default {
  name: 'ProcedureDetail',
  head: {
    title: 'Chi Tiết Tin tức',
  },
}
</script>
