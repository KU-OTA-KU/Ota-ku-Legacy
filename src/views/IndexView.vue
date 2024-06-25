<template>
  <primary-header/>
  <v-layout>
    <v-main tag="section">
      <top-slider/>
      <most-anime-list></most-anime-list>
      <footer-component/>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import PrimaryHeader from "../components/PrimaryHeader.vue";
import TopSlider from "../components/TopSlider.vue";
import MostAnimeList from "../components/MostAnimeList.vue";
import FooterComponent from "../components/Footer.vue"
export default defineComponent({
  name: "IndexView",

  components: {
    PrimaryHeader,
    TopSlider,
    MostAnimeList,
    FooterComponent,
  },
});
</script>
