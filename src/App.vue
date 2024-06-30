<template>
      <router-view/>
</template>

<script lang="ts">
import '@/sass/_App.sass';
import {compileToFunction, defineComponent, watch} from "vue";
import { RouteLocationNormalized, Router } from 'vue-router';
import { App as CapacitorApp } from '@capacitor/app';
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
          },2)
        }
    );

    let lastBackPress = 0;

    CapacitorApp.addListener('backButton', () => {
      const currentTime = new Date().getTime();
      if (currentTime - lastBackPress < 2000) {
        CapacitorApp.exitApp();
      } else {
        lastBackPress = currentTime;
        window.history.back();
      }
    });
  },
});
</script>
