<template>
  <div>
    <app-wrapper
      :breadcrumbs="[
        { text: 'Trang chủ', disabled: false, to: '/', nuxt: true },
        {
          text: 'Đăng Nhập',
          disabled: true,
          to: '/tai-khoan/dang-nhap',
          nuxt: true,
        },
      ]"
    >
      <div
        class="tw-w-full tw-flex tw-items-center tw-justify-center tw-bg-white tw-select-none"
      >
        <div
          class="tw-w-full mobile:tw-max-w-full tw-max-w-md tw-p-4 md:tw-p-8 tw-border tw-border-gray-200 tw-rounded-md"
        >
          <div
            class="tw-w-full tw-space-y-4 md:tw-space-y-5 tw-flex tw-flex-col tw-items-center"
          >
            <h1
              class="tw-font-semibold tw-text-base md:tw-text-2xl tw-text-center"
            >
              Đăng Nhập Vào Hệ Thống
            </h1>
            <div
              class="tw-w-full tw-px-4 tw-py-3 tw-bg-blue-100 tw-border tw-border-blue-200 tw-text-center active:tw-bg-blue-200 tw-transition-all tw-duration-200 tw-rounded-md tw-cursor-pointer tw-text-blue-500 tw-font-medium"
            >
              Đăng nhập với Email HUMG
            </div>
            <validation-observer v-slot="{ invalid }" class="tw-w-full">
              <div class="tw-w-full">
                <validation-provider
                  v-slot="{ errors }"
                  name="Mã sinh viên"
                  rules="required|min:9"
                >
                  <v-text-field
                    id="username"
                    v-model="username"
                    label="Mã sinh viên"
                    :error-messages="errors"
                    aria-autocomplete="off"
                    required
                    outlined
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Mật khẩu"
                  rules="required|min:6"
                >
                  <v-text-field
                    id="email"
                    v-model="password"
                    label="Mật khẩu"
                    :error-messages="errors"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    aria-autocomplete="off"
                    required
                    outlined
                    @click:append="show = !show"
                  />
                </validation-provider>
                <v-btn
                  width="100%"
                  outlined
                  color="primary"
                  large
                  :disabled="invalid"
                  @click="login"
                >
                  Đăng nhập
                </v-btn>
              </div>
              <div
                class="tw-flex tw-items-center tw-justify-end tw-m-2 hover:!tw-underline"
              >
                <nuxt-link to="/tai-khoan/quen-mat-khau" class="tw-text-sm">
                  Quên mật khẩu?
                </nuxt-link>
              </div>
            </validation-observer>
          </div>
        </div>
      </div>
    </app-wrapper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import Swal from 'sweetalert2'
import AppWrapper from '../../components/layouts/AppWrapper.vue'

const username = ref<string>('')
const password = ref<string>('')
const show = ref<boolean>(false)

const { $auth } = useContext()

const router = useRouter()

onMounted(() => {
  if ($auth.loggedIn) {
    const redirect = document.cookie
      .split(';')
      .find((item) => item.trim().startsWith('auth.redirect='))
    if (redirect) {
      router.push(`${decodeURIComponent(redirect.split('=')[1])}`)
    } else {
      router.push('/')
    }
  }
})

const login = async () => {
  try {
    const response = await $auth.loginWith('local', {
      data: new URLSearchParams({
        username: username.value,
        password: password.value,
        grant_type: 'password',
      }),
    })

    if (response) {
      router.push('/')
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Đăng nhập thất bại',
      text: 'Mã sinh viên hoặc mật khẩu không đúng',
    })
  }
}
</script>

<script lang="ts">
export default {
  head: {
    title: 'Đăng Nhập',
  },
  auth: false,
}
</script>
