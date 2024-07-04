<template>
  <v-container class="most-anime-container"
               style="max-width: var(--ota-ku-max-width); padding: 20px 10px 10px 10px; align-items: center;">
    <div v-if="mostAnimeList.length === 0">
      <v-card variant="text" class="pa-0" v-for="n in 10" :key="n">
        <v-skeleton-loader
            class="mb-3"
            type="list-item-two-line"
        >
        </v-skeleton-loader>
      </v-card>
    </div>
    <div v-else>
      <div v-for="category in mostAnimeList" :key="category.title" class="">
        <v-card variant="text" class="ota-anime-containers pa-0">
          <v-card-title class="ota-anime-containers-v-title pa-0 d-flex justify-space-between align-center">{{ category.title }}<v-btn size="small" rounded="xl" color="white" @click="this.$router.push(`catalog?${category.moreLink}`)">Больше</v-btn></v-card-title>
          <v-card-subtitle class="ota-anime-containers-v-subtitle pa-0">{{ category.description }}</v-card-subtitle>
          <v-row no-gutters class="most-anime-container">
            <v-col v-for="anime in category.anime" :key="anime.id" cols="4" xxl="2" xl="2" lg="2" md="2"
                   sm="3" xs="4" class="most-anime-container-item pa-xxl-2 pa-xl-2 pa-lg-2 pa-md-1 pa-sm-1 pa-1">
              <v-card variant="text" link rounded="lg" @click="openDialog(anime)">
                <v-img :lazy-src="anime.poster.miniUrl" :src="anime.poster.mainUrl"
                       :alt="anime.name"
                       rounded="lg" aspect-ratio="0.7" cover
                       style="pointer-events: none; user-select: none;"></v-img>
                <v-card-title class="font-weight-regular pa-0" style="font-size: 1em;">{{
                    anime.russian
                  }}
                </v-card-title>
                <v-card-subtitle class="pa-0 d-flex ga-1 pt-0 pb-3" style="font-size: 0.8em">
                  Тип: {{ anime.kind }}
                  <span>•</span>
                  {{ anime.score }} <v-icon class=""></v-icon>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </v-container>

  <anime-dialog
      :selectedAnime="selectedAnime"
      ref="animeDialogRef"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import AnimeDialog from "@/components/others/AnimeDialog.vue";

export default defineComponent({
  components: {
    AnimeDialog,
  },
  data() {
    return {
      selectedAnime: {},
    };
  },
  computed: {
    mostAnimeList() {
      return this.$store.getters['mostAnime/getMostAnimeList']
    },
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      await this.$store.dispatch('mostAnime/getMostAnimeList');
    },
    openDialog(anime: number) {
      this.selectedAnime = anime;
      this.$refs.animeDialogRef.openDialog();
    }
  },
});
</script>

<style lang="sass" scoped>
</style>
