<template>
  <v-app class="">
    <app-header />
    <v-main class="tw-pt-2">
      <v-container>
        <client-only>
          <nuxt />
          <installApp />
        </client-only>
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
import InstallApp from '../components/InstallApp.vue'
import AppFooter from '../components/layouts/AppFooter.vue'
import AppHeader from '../components/layouts/AppHeader.vue'
</script>
