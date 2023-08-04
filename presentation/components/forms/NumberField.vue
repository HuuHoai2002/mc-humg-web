<template>
  <div>
    <validation-observer class="tw-w-full">
      <validation-provider
        v-slot="{ errors, valid, untouched }"
        :name="dataField.tenThuocTinh"
        :rules="getRules()"
      >
        <v-text-field
          v-model.number="data"
          type="number"
          :label="dataField.tenThuocTinh"
          :counter="dataField.doRongDuLieu"
          :error-messages="errors"
          :success="!untouched && valid"
          :disabled="dataField.trangthai === 0"
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
  },
  setup(props, { emit }) {
    const data = ref<number>()
    const getRules = () => {
      const isRequired = props.dataField.doRongDuLieu > 0

      return isRequired ? 'required|integer' : ''
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
