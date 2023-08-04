<template>
  <div class="tw-flex tw-w-full tw-flex-col tw-gap-y-4 md:tw-gap-x-5">
    <validation-observer
      v-slot="{ invalid, handleSubmit, reset }"
      class="tw-w-full"
    >
      <div class="tw-flex tw-w-full tw-flex-col">
        <div
          id="preview-procedure-detail"
          class="tw-w-full tw-grid tw-grid-cols-1"
        >
          <get-data-field
            v-for="(field, index) in data"
            :key="index"
            :data-field="field"
            :confirm-reset="confirmReset"
            :index="index"
            @get-data="setDataField"
          />
        </div>
      </div>
      <div class="tw-flex tw-items-center tw-gap-x-4 tw-justify-center">
        <v-dialog v-model="confirmReset" max-width="350">
          <template #activator="{ on, attrs }">
            <v-btn
              id="preview-procedure-btn-reset"
              depressed
              height="40"
              text
              outlined
              v-bind="attrs"
              v-on="on"
            >
              Đặt lại
            </v-btn>
          </template>
          <div
            class="tw-p-4 md:tw-p-6 bg-white tw-flex tw-flex-col tw-gap-y-2 md:tw-gap-y-4"
          >
            <h4 class="tw-font-semibold tw-text-base md:tw-text-lg">
              Bạn có chắc chắn muốn đặt lại không 🤔?
            </h4>
            <div class="tw-text-gray-500">
              Tất cả dữ liệu bạn đã nhập sẽ bị xóa.
            </div>
            <div class="tw-ml-auto tw-flex tw-items-center tw-gap-x-2">
              <v-btn color="green darken-1" text @click="confirmReset = false">
                Hủy
              </v-btn>
              <v-btn
                color="warning darken-1"
                text
                @click="
                  () => {
                    reset()
                    handleReset()
                  }
                "
              >
                Tiếp tục
              </v-btn>
            </div>
          </div>
        </v-dialog>
        <v-btn
          id="preview-procedure-btn-continue"
          depressed
          height="40"
          text
          outlined
          color="primary"
          width="250px"
          :disabled="invalid"
          @click="handleSubmit(onSubmitHandler)"
        >
          Tiếp tục
        </v-btn>
      </div>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { ProcedureProperty } from '../../../domain/entites/ProcedureProperty'
// eslint-disable-next-line import/order
import GetDataField from './GetDataField.vue'
import { IDataField } from './type'

export default defineComponent({
  name: 'CreateForm',
  components: {
    GetDataField,
  },
  props: {
    data: {
      type: Array as PropType<ProcedureProperty[]>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(data: IDataField[]) => Promise<void>>,
      required: true,
    },
  },
  setup(props) {
    const confirmReset = ref<boolean>(false)
    const dataFields = ref<IDataField[]>([])

    const initDataFields = () => {
      dataFields.value = props.data.map((item) => {
        return {
          thuocTinhId: item.thuocTinhId,
          giaTriThuocTinh: '',
        }
      })
    }

    const handleReset = () => {
      confirmReset.value = false
      initDataFields()
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }

    onMounted(() => {
      initDataFields()
    })

    const setDataField = (data: IDataField, index: number) => {
      dataFields.value[index].giaTriThuocTinh = data.giaTriThuocTinh
    }

    const onSubmitHandler = async () => {
      await props.onSubmit(dataFields.value)
    }

    return {
      setDataField,
      confirmReset,
      dataFields,
      onSubmitHandler,
      handleReset,
      initDataFields,
    }
  },
})
</script>
