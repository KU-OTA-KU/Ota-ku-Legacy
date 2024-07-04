<template>
  <v-container class="d-flex"
               style="max-width: var(--ota-ku-max-width); padding: 20px 10px 0 10px; align-items: center">
    <v-skeleton-loader
        v-if="topSliderAnimeList.length === 0"
        type="list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
        width="100%"
        style="border-radius: 20px; height: var(--top-slider-height);"
    >
    </v-skeleton-loader>
    <v-carousel
        v-else
        hide-delimiter-background
        cycle
        model-value="1"
        direction="vertical"
        show-arrows="hover"
        style="border-radius: 20px; height: var(--top-slider-height);"
    >
      <v-carousel-item
          v-for="anime in topSliderAnimeList"
          :key="anime.id"
          cover
          link
      >
        <v-img
            class="top-slider-anime-image"
            :lazy-src="anime.poster.miniUrl"
            :src="anime.poster.originalUrl"
            :alt="anime.name"
            cover
            style="position: absolute; right: 0;"
        >

        </v-img>
        <v-card class="pa-2 d-flex flex-column justify-center top-slider-anime-card" hover color="" link
                :ripple="false">
          <v-card-title class="fill-height align-end text-wrap" v-text="anime.russian"
                        style="font-size: 2.5em; font-weight: 600; font-family: 'Kashima', sans-serif; letter-spacing: 8px; line-height: 100%;"></v-card-title>
          <v-card-subtitle class="pt-0">Оценка {{ anime.score }}</v-card-subtitle>
          <v-card-text class="top-slider-anime-cart-text">
            <p> {{ cleanDescription(anime.description) }}</p>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn variant="tonal" prepend-icon="mdi-play" :loading="loading"
                   @click="this.openAnime(anime.id)">
              Смотреть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script lang="ts">
import {cleanDescription} from "@/ts/cleanDescription.ts";
import {openAnime} from "@/ts/goTo.ts";

export default {
  name: "TopSlider",

  data() {
    return {
      cleanDescription,
      loading: false,
      openAnime,
    };
  },
  computed: {
    topSliderAnimeList() {
      return this.$store.getters['topSlider/getTopSliderAnimeLIst']
    },
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      await this.$store.dispatch('topSlider/getTopSliderAnimeLIst');
      console.log(this.topSliderAnimeList)
    },
  },
};
</script>
<style scoped lang="sass">
.top-slider-anime-card
  background: linear-gradient(90deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 1) 52%, rgba(10, 10, 10, 0.4) 100%)
  min-height: var(--top-slider-height)

.top-slider-anime-image
  width: 48%

.top-slider-anime-cart-text
  width: 70%
  display: -webkit-box
  -webkit-line-clamp: 5
  -webkit-box-orient: vertical
  overflow: hidden
  max-height: 115px
  white-space: normal
  color: #9e9e9e
  font-family: 'Inter', sans-serif


@media screen and (max-width: 600px)
  .top-slider-anime-image
    width: 100%

  .top-slider-anime-card
    background: rgba(10, 10, 10, 0.7)

  .top-slider-anime-cart-text
    width: 100%
</style>
