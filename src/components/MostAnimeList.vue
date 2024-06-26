<template>
  <v-container class="most-anime-container"
               style="max-width: var(--ota-ku-max-width); padding: 20px 10px 10px 10px; align-items: center;">
    <div v-if="mostAnimeListSkeleton">
      <v-card variant="text" class="pa-0" v-for="n in 2" :key="n">
        <v-skeleton-loader
            class="mb-3"
            type="list-item-two-line"
        >
        </v-skeleton-loader>
        <v-row no-gutters class="mt-1">
          <v-col v-for="n in 6" :key="n" cols="6" xxl="2" xl="2" lg="2" md="3" sm="4" xs="4" class="pa-2">
            <v-skeleton-loader
                class="mb-5 custom-skeleton-1"
                type="image, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-else>
      <div v-for="category in animeList" :key="category.title" class="mb-5">
        <v-card variant="text" class="pa-0">
          <v-card-title class="pa-0">{{ category.title }}</v-card-title>
          <v-card-subtitle class="pa-0">{{ category.description }}</v-card-subtitle>
          <v-row no-gutters class="mt-1">
            <v-col v-for="anime in category.anime" :key="anime.id" cols="6" xxl="2" xl="2" lg="2" md="3"
                   sm="4" xs="4" class="pa-2">
              <v-card variant="text" link rounded="lg" @click="openDialog(anime)">
                <v-img :lazy-src="anime.poster.miniUrl" :src="anime.poster.mainUrl"
                       :alt="anime.name"
                       rounded="lg" aspect-ratio="0.7" cover
                       style="pointer-events: none; user-select: none;"></v-img>
                <v-card-title class="pa-1 font-weight-regular" style="font-size: 1em;">{{
                    anime.russian
                  }}
                </v-card-title>
                <v-card-subtitle class="pa-1 d-flex ga-1 pt-0 pb-3" style="font-size: 0.8em">
                  Тип: {{ anime.kind }}
                  <span>•</span>
                  Оценка: {{ anime.score }}
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
      animeList: [],
      selectedAnime: {},
      mostAnimeListSkeleton: ref(true),
    };
  },
  mounted() {
    this.fetchAllData(6);
  },
  methods: {
    async fetchAllData(animeLimit: number) {
      try {
        const response = await axios.post("https://shikimori.one/api/graphql", {
          query: `
              query {
                ongoingAnime: animes(limit: 6, order: popularity, status: "ongoing", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                  }
                  airedOn {
                    year
                  }
                }
                anonseAnime: animes(season: "2024", limit: ${animeLimit}, order: name, status: "anons", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                  }
                  airedOn {
                    year
                  }
                }
                topAnime: animes(limit: ${animeLimit}, order: ranked, status: "released", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                  }
                  airedOn {
                    year
                  }
                }
                releasedAnime: animes(limit: ${animeLimit}, order: popularity, status: "released", kind: "tv") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                  }
                  airedOn {
                    year
                  }
                }
                filmsAnime: animes(season: "2020_2024", limit: ${animeLimit}, order: popularity, status: "released", kind: "movie") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                  }
                  airedOn {
                    year
                  }
                }
                ovaAnime: animes(season: "2023_2024", limit: ${animeLimit}, order: popularity, status: "released", kind: "ova") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
                  }
                  airedOn {
                    year
                  }
                }
                onaAnime: animes(season: "2023_2024", limit: ${animeLimit}, order: popularity, status: "released", kind: "ona") {
                  id
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    miniUrl
                    mainUrl
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
          description: "оригинальные анимационные сети (ONA) с уникальными и захватывающими сюжетами!",
          anime: data.data.onaAnime,
        });
        this.animeList.push({
          title: "Топ аниме",
          description: "Погружайся в лучшие произведения аниме, отмеченные высшим призом!",
          anime: data.data.topAnime,
        });
        this.animeList.push({
          title: "Популярные OVA",
          description: "(Original Video Animation) — эксклюзивные анимационные произведения!",
          anime: data.data.ovaAnime,
        });
        this.animeList.push({
          title: "Анонсы",
          description: "Узнавай первым о предстоящих релизах, которые ожидают нас!",
          anime: data.data.anonseAnime,
        });
        this.animeList.push({
          title: "Завершенные",
          description: "Проведи время в компании классических аниме, наполненных волнением!",
          anime: data.data.releasedAnime,
        });
        this.animeList.push({
          title: "Фильмы",
          description: "Эксклюзивная коллекция анимационных фильмов для наслаждения!",
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
