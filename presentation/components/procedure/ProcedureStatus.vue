<template>
  <span class="tw-flex tw-items-center tw-gap-x-2">
    <span>
      {{ title }}
    </span>
    <span class="tw-font-medium" :class="twClass"> {{ statusContent }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { EStatus } from '../../../domain/enums/EStatus'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: false,
      default: 'Trạng thái: ',
    },
    status: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const twClass = ref<string>('')
    const statusContent = ref<string>('')

    switch (props.status) {
      case EStatus.SENT: {
        twClass.value = 'tw-text-blue-500'
        statusContent.value = 'Đã gửi'
        break
      }
      case EStatus.PROCESSING: {
        twClass.value = 'tw-text-yellow-500'
        statusContent.value = 'Đang xử lý'
        break
      }
      case EStatus.DONE: {
        twClass.value = 'tw-text-green-500'
        statusContent.value = 'Hoàn thành'
        break
      }
      case EStatus.REJECTED: {
        twClass.value = 'tw-text-red-500'
        statusContent.value = 'Bị từ chối'
        break
      }
      default: {
        twClass.value = 'tw-text-blue-500'
        statusContent.value = 'Đã gửi'
        break
      }
    }
    return {
      twClass,
      statusContent,
    }
  },
})
</script>

<style scoped></style>
