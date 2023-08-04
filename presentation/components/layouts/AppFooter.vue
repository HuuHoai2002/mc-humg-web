<template>
  <footer class="tw-bg-blue-500 mobile:tw-mb-10 lg:tw-mb-0 tw-text-white">
    <v-container>
      <div
        class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-between tw-gap-y-2"
      >
        <div class="tw-flex tw-flex-col tw-gap-y-1 tw-text-sm">
          <h3 class="tw-font-medium tw-text-base">Thông tin liên hệ</h3>
          <span>
            Số 18, phố Viên, phường Đức Thắng, quận Bắc Từ Liêm, thành phố Hà
            Nội
          </span>
          <span
            ><a
              class="!tw-text-white hover:!tw-underline"
              href="mailto:bpmc@humg.edu.vn"
              >Email: bpmc@humg.edu.vn</a
            >
            -
            <a class="!tw-text-white hover:!tw-underline" href="tel:02437525773"
              >Tel: 024.37525773</a
            ></span
          >
        </div>
        <div class="tw-flex tw-flex-col tw-gap-y-1 tw-text-sm">
          <h3 class="tw-font-medium tw-text-base">Liên kết</h3>
          <span>
            <a
              class="!tw-text-white hover:!tw-underline"
              href="https://humg.edu.vn"
              target="_blank"
              >Trường Đại học Mỏ - Địa chất</a
            >
          </span>
          <span>
            <a
              class="!tw-text-white hover:!tw-underline"
              href="http://mail.humg.edu.vn"
              target="_blank"
              >Mail HUMG</a
            >
          </span>
        </div>
      </div>
      <div class="tw-pt-2 tw-mt-1 md:tw-pt-3 tw-border-t tw-border-gray-200">
        <span class="tw-text-white"
          >Copyright &copy; {{ new Date().getFullYear() }}
          <span class="tw-font-medium"
            >Bản quyền thuộc về Trường Đại học Mỏ - Địa chất</span
          ></span
        >
      </div>
    </v-container>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter',
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
