<template>
  <v-container class="most-anime-container"
               style="max-width: var(--ota-ku-max-width); padding: 20px 10px 10px 10px; align-items: center;">
    <div v-if="mostAnimeListSkeleton">
      <v-card variant="text" class="pa-0" v-for="n in 10" :key="n">
        <v-skeleton-loader
            class="mb-3"
            type="list-item-two-line"
        >
        </v-skeleton-loader>
      </v-card>
    </div>
    <div v-else>
      <div v-for="category in animeList" :key="category.title" class="">
        <v-card variant="text" class="ota-anime-containers pa-0">
          <v-card-title class="ota-anime-containers-v-title pa-0 d-flex justify-space-between align-center">{{ category.title }}<v-btn size="small" rounded="xl" color="white">Больше</v-btn></v-card-title>
          <v-card-subtitle class="ota-anime-containers-v-subtitle pa-0">{{ category.description }}</v-card-subtitle>
          <v-row no-gutters class="mt-1">
            <v-col v-for="anime in category.anime" :key="anime.id" cols="4" xxl="2" xl="2" lg="2" md="2"
                   sm="3" xs="4" class="pa-xxl-2 pa-xl-2 pa-lg-2 pa-md-1 pa-sm-1 pa-1">
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
import axios from "axios";
import {defineComponent, ref} from "vue";
import AnimeDialog from "@/components/others/AnimeDialog.vue";

export default defineComponent({
  components: {
    AnimeDialog,
  },
  data() {
    return {
      animeLimit: 6,
      animeList: [],
      selectedAnime: {},
      mostAnimeListSkeleton: ref(true),
    };
  },
  mounted() {
    this.fetchAllData();
  },
  methods: {
    async fetchAllData() {
      try {
        const response = await axios.post("https://shikimori.one/api/graphql", {
          query: `
              query {
                ongoingAnime: animes(season: "2023_2024", limit: ${this.animeLimit}, order: popularity, status: "ongoing", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
                anonseAnime: animes(season: "2024", limit: ${this.animeLimit}, order: name, status: "anons", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
                topAnime: animes(limit: ${this.animeLimit}, order: ranked, status: "released", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
                releasedAnime: animes(limit: ${this.animeLimit}, order: popularity, status: "released", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
                filmsAnime: animes(season: "2020_2024", limit: ${this.animeLimit}, order: popularity, status: "released", kind: "movie") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
                ovaAnime: animes(season: "2022_2024", limit: ${this.animeLimit}, order: popularity, status: "released", kind: "ova") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
                onaAnime: animes(season: "2022_2024", limit: ${this.animeLimit}, order: popularity, status: "released", kind: "ona") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                    originalUrl
                  }
                  airedOn {
                    year
                  }
                }
              }
            `,
        }, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status !== 200) {
          this.$router.push(`/error`);
        }

        const data = response.data;
        this.animeList.push({
          title: "Онгоинги",
          description: "Вступай в новые эпизоды приключений, следи за сюжетом!",
          anime: data.data.ongoingAnime,
        });
        this.animeList.push({
          title: "Популярные ONA",
          description: "ONA с уникальными и захватывающими сюжетами!",
          anime: data.data.onaAnime,
        });
        this.animeList.push({
          title: "Топ аниме",
          description: "Погружайся в лучшие произведения аниме!",
          anime: data.data.topAnime,
        });
        this.animeList.push({
          title: "Популярные OVA",
          description: "Эксклюзивные анимационные произведения!",
          anime: data.data.ovaAnime,
        });
        this.animeList.push({
          title: "Анонсы",
          description: "Узнавай первым о предстоящих релизах!",
          anime: data.data.anonseAnime,
        });
        this.animeList.push({
          title: "Завершенные",
          description: "Проведи время в компании классических аниме!",
          anime: data.data.releasedAnime,
        });
        this.animeList.push({
          title: "Фильмы",
          description: "Эксклюзивная коллекция фильмов для наслаждения!",
          anime: data.data.filmsAnime,
        });

        this.mostAnimeListSkeleton = false;
      } catch (error) {
        console.log(error);

      }
    },
    openDialog(anime) {
      this.selectedAnime = anime;
      this.$refs.animeDialogRef.openDialog();
    }
  },
});
</script>

<style lang="sass">
.custom-skeleton-1
  .v-skeleton-loader__image
    height: 260px
</style>
