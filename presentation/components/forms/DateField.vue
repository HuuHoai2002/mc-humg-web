<template>
  <div>
    <validation-observer class="tw-w-full">
      <validation-provider
        v-slot="{ errors }"
        :name="dataField.tenThuocTinh"
        rules="required"
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          bottom
          max-width="290px"
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="innerData"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              :label="dataField.tenThuocTinh"
              :error-messages="errors"
              :disabled="dataField.trangthai === 0"
              :placeholder="dataField.ghiChu"
              outlined
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data"
            no-title
            locale="vi"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
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
    const innerData = ref<string>('')

    const menu = ref<boolean>(false)

    watch(data, (value) => {
      if (props.dataField.trangthai === 0) return

      const date = new Date(value)

      innerData.value = date?.toLocaleDateString('vi-VN')

      emit('input', date?.toLocaleDateString('vi-VN'))
    })

    return { data, menu, innerData }
  },
})
</script>

<style scoped></style>
