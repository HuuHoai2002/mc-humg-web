<template>
  <div class="tw-flex tw-items-center tw-gap-x-2">
    <v-text-field
      ref="searchInputRef"
      v-model="keyword"
      label="Tra cứu lịch sử hồ sơ"
      placeholder="Nhập vào mã hồ sơ"
      hide-details
      dense
      outlined
      @keydown="handleSearchInputKeydown($event)"
    />
    <v-btn
      depressed
      height="40"
      text
      outlined
      @click="handleSearchInputClick()"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HeaderSearch',
  setup() {
    const keyword = ref<string>('')
    const router = useRouter()
    const route = useRoute()
    const searchInputRef = ref<HTMLInputElement | null>(null)

    watch(
      () => route.value,
      () => {
        if (route.value.path !== '/tra-cuu') return
        keyword.value = route.value.query.mhs as string
      },
      { immediate: true }
    )

    const handleSearchInputClick = (): void => {
      if (keyword.value.trim() === '') {
        searchInputRef.value?.focus()
      } else {
        router.push({
          path: '/tra-cuu',
          query: { mhs: keyword.value },
        })
      }
    }

    const handleSearchInputKeydown = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        handleSearchInputClick()
      }
    }

    return {
      keyword,
      searchInputRef,
      handleSearchInputClick,
      handleSearchInputKeydown,
    }
  },
})
</script>

<style scoped></style>
