<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="tw-sticky tw-top-0 tw-z-20 bg-white">
    <div class="lg:tw-max-w-[1440px] tw-mx-auto">
      <img src="~/assets/images/header-banner.png" alt="" />
    </div>
    <div
      class="tw-border-y tw-border-gray-200 tw-transition-all tw-mb-4 md:tw-mb-6"
    >
      <div class="lg:tw-max-w-[1440px] tw-mx-auto">
        <header class="tw-w-full tw-flex tw-justify-center tw-bg-white">
          <div
            class="tw-h-14 lg:tw-h-20 tw-flex tw-w-full tw-items-center tw-justify-between md:tw-gap-x-4 lg:tw-gap-x-8 tw-overflow-y-visible tw-px-2 md:tw-px-4 lg:tw-px-5"
          >
            <div class="tw-hidden tw-relative md:tw-flex tw-shrink-0">
              <nuxt-link to="/" class="!tw-normal-case">
                <div
                  class="tw-font-medium tw-text-base md:tw-text-xl tw-flex tw-items-center tw-gap-x-1"
                >
                  <app-logo />
                  <span class="mobile:tw-hidden tw-select-none">BPMC</span>
                </div>
              </nuxt-link>
            </div>
            <div class="tw-w-full tw-flex tw-items-center lg:tw-gap-x-8">
              <div class="tw-flex-1">
                <header-search />
              </div>
              <div>
                <div
                  v-if="!drawer"
                  class="tw-fixed tw-bottom-0 tw-right-0 tw-left-0 tw-border-t tw-border-gray-200 lg:tw-border-none lg:tw-relative lg:tw-px-0 tw-z-30 tw-bg-white"
                >
                  <header-navigation
                    :default-navigations="defaultNavigations"
                    :private-navigations="privateNavigations"
                    :current-route="currentRoute"
                    :is-logged-in="isLoggedIn"
                    :on-show-sidebar="onShowSidebar"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
    <v-row>
      <v-navigation-drawer v-model="drawer" app temporary>
        <div class="tw-p-2 tw-flex tw-items-center tw-justify-center">
          <nuxt-link to="/" class="!tw-normal-case">
            <img
              src="~/static/icon.png"
              class="tw-w-full tw-max-h-40 tw-object-cover"
              alt=""
            />
          </nuxt-link>
        </div>
        <div class="tw-mt-2">
          <v-expansion-panels focusable tile>
            <v-expansion-panel
              v-for="(menu, i) in defaultMenuNavigations"
              :key="i"
            >
              <v-expansion-panel-header>
                {{ menu.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list nav dense>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, index) in menu.items"
                      :key="index"
                      :to="item.url"
                      exact
                      nuxt
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <div v-if="isLoggedIn" class="tw-w-full">
              <v-expansion-panel
                v-for="(menu, i) in privateNavigations"
                :key="i"
              >
                <v-expansion-panel-header>
                  {{ menu.title }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list nav dense>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(item, index) in menu.items"
                        :key="index"
                        :to="item.url"
                        exact
                        :nuxt="Boolean(item.url)"
                        class="!tw-cursor-pointer"
                        @click="item?.onClick"
                      >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </div>
          </v-expansion-panels>
        </div>
      </v-navigation-drawer>
    </v-row>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import HeaderNavigation from '../HeaderNavigation.vue'
import HeaderSearch from '../HeaderSearch.vue'
import AppLogo from './AppLogo.vue'

export interface HeaderNavigationProps {
  type: 'link' | 'menu'
  title: string
  url?: string
  icon?: string
  items?: {
    title: string
    url?: string
    onClick?: () => Promise<void>
  }[]
}

export default defineComponent({
  name: 'AppHeader',
  components: {
    HeaderSearch,
    HeaderNavigation,
    AppLogo,
  },
  setup() {
    const route = useRoute()
    const { $auth } = useContext()

    const isLoggedIn = computed(() => $auth.loggedIn)

    const drawer = ref<boolean>(false)
    const showSearchInput = ref<boolean>(false)
    const showBanner = ref<boolean>(true)
    const searchInputRef = ref<HTMLInputElement | null>(null)
    // const scrollPosition = ref<number>(0)

    const defaultNavigations = ref<HeaderNavigationProps[]>([
      {
        type: 'link',
        title: 'Trang chủ',
        url: '/',
        // icon: 'mdi-home'
      },
      {
        type: 'link',
        title: 'Thủ tục',
        url: '/thu-tuc',
        // icon: 'mdi-newspaper',
      },
    ])

    const privateNavigations = ref<HeaderNavigationProps[]>([
      {
        type: 'menu',
        title: 'Tài khoản',
        // icon: 'mdi-account',
        items: [
          {
            title: 'Thông tin cá nhân',
            url: '/tai-khoan',
            onClick: async () => {},
          },
          {
            title: 'Lịch sử hồ sơ',
            url: '/tai-khoan/lich-su-ho-so',
            onClick: async () => {},
          },
          {
            title: 'Đăng xuất',
            onClick: async () => {
              await $auth.logout()
            },
          },
        ],
      },
    ])

    const currentRoute = computed(() => route.value.path)

    const defaultMenuNavigations = computed(() => {
      return defaultNavigations.value.filter((item) => item.type === 'menu')
    })

    const handleClickSearchInput = () => {
      showSearchInput.value = !showSearchInput.value
    }

    const handleScroll = () => {
      // const currentScrollPosition = window.scrollY

      // if (currentScrollPosition < scrollPosition.value) {
      //   console.log('scroll up')
      //   showBanner.value = true
      // } else {
      //   console.log('scroll down')
      //   showBanner.value = false
      // }
      // scrollPosition.value = window.scrollY

      if (window.scrollY > 0) {
        showBanner.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const onShowSidebar = () => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      defaultNavigations,
      currentRoute,
      showSearchInput,
      searchInputRef,
      showBanner,
      handleClickSearchInput,
      defaultMenuNavigations,
      privateNavigations,
      onShowSidebar,
      isLoggedIn,
    }
  },
})
</script>

<style scoped>
.v-expansion-panel-content::v-deep > .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
