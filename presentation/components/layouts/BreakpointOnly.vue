<template>
  <div :class="activeClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'BreakpointOnly',
  props: {
    breakpoint: {
      type: String,
      default: 'desktop',
    },
  },
  setup(props) {
    const activeClass = ref<string>('');

    switch (props.breakpoint) {
      case 'desktop':
        activeClass.value = 'desktop_only';
        break;
      case 'tablet':
        activeClass.value = 'tablet_only';
        break;
      case 'mobile':
        activeClass.value = 'mobile_only';
        break;
      default:
        activeClass.value = 'desktop_only';
        break;
    }
    return {
      activeClass,
    }
  },
})
</script>

<style>
.desktop_only, .mobile_only, .tablet_only {
  display: none;
}


@media (max-width: 767px) {
  .mobile_only {
    display: block;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .tablet_only {
    display: block;
  }
}


@media (min-width: 1024px) {
  .desktop_only {
    display: block;
  }
}
</style>
