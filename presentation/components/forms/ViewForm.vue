<template>
  <div class="tw-flex tw-w-full tw-flex-col tw-gap-y-4 md:tw-gap-x-5">
    <div class="tw-flex tw-w-full tw-flex-col">
      <div
        class="tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-4 lg:tw-gap-x-6"
      >
        <v-text-field
          v-for="(field, index) in properties.sm"
          :key="index"
          :label="field.tenThuocTinh"
          disabled
          outlined
        />
      </div>
      <div class="tw-w-full tw-grid tw-grid-cols-1">
        <v-text-field
          v-for="(field, index) in properties.lg"
          :key="index"
          :label="field.tenThuocTinh"
          disabled
          outlined
        />
      </div>
      <div class="tw-w-full tw-grid tw-grid-cols-1">
        <v-textarea
          v-for="(field, index) in properties.sm"
          :key="index"
          :label="field.tenThuocTinh"
          disabled
          outlined
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Property } from '../../../domain/entites/Property'

export default defineComponent({
  name: 'ViewListDataFields',
  props: {
    data: {
      type: Array as PropType<Property[]>,
      required: true,
    },
  },
  setup(props) {
    const getListProperties = () => {
      const sm = props.data.filter((item) => item.doRongDuLieu < 50)
      const lg = props.data.filter(
        (item) => item.doRongDuLieu >= 50 && item.doRongDuLieu < 200
      )
      const area = props.data.filter((item) => item.doRongDuLieu >= 200)

      if (sm.length !== 0) {
        const lastElement = sm.pop()
        lg.unshift(lastElement as Property)
      }

      return {
        sm,
        lg,
        area,
      }
    }
    const properties = getListProperties()

    return {
      properties,
    }
  },
})
</script>
