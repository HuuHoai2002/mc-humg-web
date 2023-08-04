<template>
  <div>
    <validation-observer class="tw-w-full">
      <validation-provider
        v-slot="{ errors }"
        :name="dataField.tenThuocTinh"
        :rules="getRules()"
      >
        <component
          :is="type"
          v-model="data"
          :label="dataField.tenThuocTinh"
          :error-messages="errors"
          :disabled="dataField.trangthai === 0"
          :placeholder="dataField.ghiChu"
          clearable
          outlined
        />
      </validation-provider>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import { Property } from '../../../domain/entites/Property'

export default defineComponent({
  props: {
    dataField: {
      type: Object as PropType<Property>,
      required: true,
    },
    type: {
      type: String,
      default: 'v-text-field',
      required: false,
    },
  },
  setup(props, { emit }) {
    const data = ref<string>('')
    const getRules = () => {
      const isRequired = props.dataField.doRongDuLieu > 0

      return `${isRequired ? 'required|' : ''}min:${
        props.dataField.doRongDuLieu + 1
      }`
    }

    watch(data, (value) => {
      if (props.dataField.trangthai === 0) return
      emit('input', value)
    })

    return { data, getRules }
  },
})
</script>

<style scoped></style>
