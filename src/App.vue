<template>
      <router-view/>
</template>

<script lang="ts">
import '@/sass/_App.sass';
import {compileToFunction, defineComponent, watch} from "vue";
import { RouteLocationNormalized, Router } from 'vue-router';
export default defineComponent({
  name: "App",

  data() {
    return {
      //
    };
  },
  mounted() {
    watch(
        () => this.$route,
        (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
          console.log('routeChanged:', to.fullPath);
          setTimeout(function compileToFunction() {
            window.scrollTo({top: 0});
          },1)
        }
    );
  },
});
</script>
