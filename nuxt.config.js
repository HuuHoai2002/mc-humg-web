import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  srcDir: 'presentation/',
  head: {
    titleTemplate: '%s | Bộ Phận Một Cửa - HUMG',
    title: 'Bộ Phận Một Cửa - HUMG',
    htmlAttrs: {
      lang: 'vi',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/bootstrap/css/bootstrap.min.css',
      },
      { rel: 'stylesheet', type: 'text/css', href: '/css/all.min.css' },
    ],
    script: [
      { src: '/bootstrap/js/jquery.min.js', body: true },
      { src: '/bootstrap/js/bootstrap.min.js', body: true },
      { src: '/bootstrap/js/popper.min.js', body: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/components/common/globalComponents',
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/sweetalert2', ssr: true },
    { src: '~/plugins/vue-tour', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'vue-sweetalert2/nuxt',
    [
      'vue-toastification/nuxt',
      {
        timeout: 2000,
        closeOnClick: false,
        draggable: false,
      },
    ],
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxy: true,
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  loading: {
    color: '#1976d2',
    height: '2px',
    throttle: 0,
  },
  // PWA
  pwa: {
    manifest: {
      name: 'Một Cửa HUMG',
      lang: 'vi',
    },
  },
  // Auth
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/humg-api/auth/login', method: 'post' },
          logout: { url: '/humg-api/auth/logout', method: 'post' },
          user: { url: '/humg-api/dkmh/w-locsinhvieninfo', method: 'post' },
        },
        user: {
          property: false,
          autoFetch: true,
        },
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer',
        },
      },
    },
    localStorage: false,
    redirect: {
      login: '/tai-khoan/dang-nhap',
      logout: '/',
      callback: '/tai-khoan/dang-nhap',
      home: '/',
    },
    rewriteRedirects: true,
  },
  proxy: {
    '/humg-api/': {
      target: 'https://daotaodaihoc.humg.edu.vn/api',
      pathRewrite: { '^/humg-api/': '' },
    },
    '/api/': {
      target: 'http://35.194.46.76:1005/api',
      // target:
      //   'https://26c5-2405-4802-1cb6-4960-752c-3471-1cf2-aafb.ngrok-free.app/api',
      pathRewrite: { '^/api/': '' },
    },
  },
  router: {
    middleware: ['auth'],
  },
}
