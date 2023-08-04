<template>
  <div>
    <text-field
      v-if="
        dataField.kieuDuLieu === EDataType.STRING ||
        dataField.kieuDuLieu === EDataType.NUMBER
      "
      v-model="data"
      :data-field="dataField"
      :type="type"
    />
    <date-field v-if=" dataField.kieuDuLieu === EDataType.DATE" v-model="data" :data-field="dataField" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import { ProcedureProperty } from '../../../domain/entites/ProcedureProperty'
import { EDataType } from '../../../domain/enums/EDataType'
import DateField from './DateField.vue'
import TextField from './TextField.vue'

export default defineComponent({
  name: 'GetDataField',
  components: {
    TextField,
    DateField,
  },
  props: {
    dataField: {
      type: Object as PropType<ProcedureProperty>,
      required: true,
    },
    type: {
      type: String,
      default: 'v-text-field',
      required: false,
    },
    confirmReset: {
      type: Boolean,
      default: false,
      required: false,
    },
    index: {
      type: Number,
      default: 0,
      required: false,
    },
    // defaultValue: {
    //   type: String,
    //   default: '',
    //   required: false,
    // },
  },
  setup(props, { emit }) {
    const data = ref<string | number>('')

    watch(data, (value) => {
      emit(
        'get-data',
        {
          thuocTinhId: props.dataField.thuocTinhId,
          giaTriThuocTinh: value,
        },
        props.index
      )
    })

    watch(
      () => props.confirmReset,
      (value) => {
        if (value) {
          data.value = ''
        }
      }
    )

    return { data, EDataType }
  },
})
</script>
