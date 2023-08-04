<template>
  <div>
    <div
      class="tw-w-full tw-flex tw-items-center tw-justify-between tw-gap-x-1 md:tw-gap-x-2"
    >
      <v-btn
        v-for="(navigation, index) in defaultLinkNavigations"
        :key="index"
        text
        small
        :color="currentRoute === navigation.url ? 'primary' : 'secondary'"
        :to="navigation.url"
        height="40"
        nuxt
        class="!tw-no-underline !tw-flex-1 lg:!tw-flex-none mobile:!tw-rounded-none tablet:!tw-rounded-none"
      >
        <v-icon> {{ navigation.icon }} </v-icon>
        <span class="tw-text-sm !tw-font-medium !tw-normal-case">
          {{ navigation.title }}
        </span>
      </v-btn>
      <div
        v-if="defaultMenuNavigations.length > 0"
        class="tw-hidden lg:tw-block"
      >
        <navigation-list :navigations="defaultMenuNavigations" />
      </div>
      <div v-if="isLoggedIn" class="!tw-hidden lg:!tw-block">
        <navigation-list :navigations="privateNavigations" />
      </div>
      <v-btn
        v-else
        text
        small
        to="/tai-khoan/dang-nhap"
        :color="
          currentRoute === '/tai-khoan/dang-nhap' ? 'primary' : 'secondary'
        "
        height="40"
        nuxt
        class="!tw-no-underline !tw-flex-1 lg:!tw-flex-none mobile:!tw-rounded-none tablet:!tw-rounded-none"
      >
        <span class="tw-text-sm !tw-font-medium !tw-normal-case">
          Đăng nhập
        </span>
      </v-btn>
      <client-only>
        <v-btn
          v-if="
            defaultMenuNavigations.length > 0 ||
            (privateNavigations.length > 0 && isLoggedIn)
          "
          text
          small
          height="40"
          nuxt
          class="!tw-no-underline !tw-flex-1 lg:!tw-flex-none mobile:!tw-rounded-none tablet:!tw-rounded-none tw-pointer-events-none !tw-hidden mobile:!tw-block tablet:!tw-block mobile:tw-pointer-events-auto tablet:tw-pointer-events-auto"
          @click="onShowSidebar"
        >
          <span class="tw-text-sm !tw-font-medium !tw-normal-case">
            <v-icon> mdi-menu </v-icon>
          </span>
        </v-btn>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { HeaderNavigationProps } from './layouts/AppHeader.vue'
import NavigationList from './NavigationList.vue'

export default defineComponent({
  name: 'HeaderNavigation',
  components: {
    NavigationList,
  },
  props: {
    defaultNavigations: {
      type: Array as PropType<HeaderNavigationProps[]>,
      required: true,
    },
    privateNavigations: {
      type: Array as PropType<HeaderNavigationProps[]>,
      required: true,
    },
    currentRoute: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    onShowSidebar: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const defaultLinkNavigations = props.defaultNavigations.filter(
      (navigation) => navigation.type === 'link'
    )
    const defaultMenuNavigations = props.defaultNavigations.filter(
      (navigation) => navigation.type === 'menu'
    )
    return {
      defaultLinkNavigations,
      defaultMenuNavigations,
    }
  },
})
</script>

<style scoped></style>
