<template>
  <transition mode="out-in">
    <div
      v-if="promptTriggered && !promptDismissed && !promptAccepted"
      class="tw-fixed tw-z-40 tw-top-10 tw-right-10 tw-bg-white tw-shadow-xl tw-w-full tw-max-w-xs tw-rounded-md"
    >
      <v-container>
        <div
          class="tw-w-full tw-flex tw-items-center tw-flex-col tw-gap-y-3 tw-justify-center"
        >
          <div class="tw-absolute tw-top-2 tw-right-2">
            <v-btn icon @click="hidden">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <img class="tw-max-h-20" alt="HUMG logo" src="~/static/icon.png" />
          <h2 class="tw-font-bold">
            Cài đặt ứng dụng <span class="tw-text-blue-400">Một Cửa HUMG</span>
          </h2>
          <div class="tw-flex tw-items-center tw-gap-x-4">
            <v-btn
              small
              text
              color="warning"
              class="!tw-normal-case"
              @click="dismiss"
            >
              Không hiện lại
            </v-btn>
            <v-btn
              small
              class="!tw-normal-case"
              text
              color="primary"
              @click="install"
              >Cài đặt ngay</v-btn
            >
          </div>
        </div>
      </v-container>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  transition: {
    name: 'fade',
    mode: 'out-in',
  },
  setup() {
    const deferredPrompt = ref<any>(null)
    const promptTriggered = ref<boolean>(false)
    const promptDismissed = ref<boolean>(false)
    const promptAccepted = ref<boolean>(false)

    const install = () => {
      const dismissed = document.cookie.includes('dismissAddToHomeScreen')
      if (dismissed) return
      if (deferredPrompt.value) {
        deferredPrompt.value.prompt()
        deferredPrompt.value.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            promptAccepted.value = true
          } else {
            promptDismissed.value = true
          }
          deferredPrompt.value = null
        })
      }
    }

    const dismiss = () => {
      // dismiss the prompt 15 days
      const now = new Date()
      const time = now.getTime()
      const expireTime = time + 15 * 24 * 60 * 60 * 1000
      now.setTime(expireTime)
      document.cookie = `dismissAddToHomeScreen=true; expires=${now.toUTCString()}; path=/`
      promptDismissed.value = true
      deferredPrompt.value = null
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      const dismissed = document.cookie.includes('dismissAddToHomeScreen')
      if (dismissed) return
      promptTriggered.value = true
    }

    const hidden = () => {
      promptTriggered.value = false
      promptDismissed.value = true
      deferredPrompt.value = null
    }

    onMounted(() => {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    })

    return {
      deferredPrompt,
      promptTriggered,
      promptDismissed,
      promptAccepted,
      install,
      dismiss,
      hidden,
    }
  },
})
</script>
