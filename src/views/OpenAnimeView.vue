<template>
    <v-layout>
        <v-app-bar :elevation="0" color="transparent" scroll-behavior="hide">
            <template v-slot:prepend>
                <v-btn icon="mdi-arrow-left" variant="tonal" theme="customDarkTheme" rounded="lg" @click="goBack()">
                </v-btn>
            </template>
            <template v-slot:append>
                <v-btn icon="mdi-home" variant="tonal" theme="customDarkTheme" rounded="lg" class="mr-3" @click="this.$router.push('/')">
                </v-btn>
                <v-btn icon="mdi-dots-vertical" variant="tonal" theme="customDarkTheme" rounded="lg" disabled>
                </v-btn>
            </template>
        </v-app-bar>
    </v-layout>
    <v-layout>
        <v-main v-if="animeList && animeList.poster && currentAnime">
            <!-- background and image-->
            <section class="position-relative">
                <v-parallax
                    :src="animeList.poster.originalUrl"
                    width="100%"
                    cover
                    class="anime-background-image"
                >
                </v-parallax>
                <div class="anime-background-shadow position-absolute top-0">
                </div>
            </section>
            <!-- name and other info -->
            <section>
                <v-container
                    style="max-width: var(--ota-ku-max-width); padding: 0 10px 10px 10px;" class="d-flex ga-5">
                    <div style="width: 25%;" class="name-and-other-anime-poster">
                        <v-img
                            rounded="lg"
                            aspect-ratio="0.7"
                            cover
                            :lazy-src="animeList.poster.originalUrl"
                            :src="animeList.poster.originalUrl"
                        >
                        </v-img>
                    </div>
                    <v-card variant="text" style="width: 75%;" class="name-and-other-anime-information">
                        <v-card-title class="text-wrap pa-0 pb-1">{{ animeList.russian }}</v-card-title>
                        <v-card-subtitle class="text-wrap pa-0 pb-2" style="font-size: 0.9em">{{ animeList.english }} /
                            {{ animeList.name }}
                        </v-card-subtitle>
                        <v-card-text
                            class="text-wrap pa-0 pb-2 d-flex flex-column ga-2 anime-and-other-info-v-card-text">
                            <span style="font-size: 0.9em">Тип: <i>{{ animeList.kind }}</i></span>
                            <span style="font-size: 0.9em">Эпизоды: <i>{{ animeList.episodes }}</i></span>
                            <span style="font-size: 0.9em">Статус: <i>{{ animeList.status }}</i></span>
                            <span v-if="animeList.nextEpisodeAt != null" style="font-size: 0.9em">Следуюший эпизод: <i>{{
                                    formatDate(animeList.nextEpisodeAt, locale)
                                }} по {{ locale }}</i></span>
                            <span style="font-size: 0.9em">Жанры: <i>{{ genres.join(', ') }}</i></span>
                            <span style="font-size: 0.9em">Студии: <i>{{ studios.join(', ') }}</i></span>
                            <span
                                style="font-size: 0.9em">Описание: <i>{{ cleanDescription(animeList.description) }}</i></span>
                        </v-card-text>
                    </v-card>
                </v-container>
            </section>
            <!-- Gallery -->
            <section>
                <v-container
                    style="max-width: var(--ota-ku-max-width); padding: 10px 10px 10px 10px; align-items: center;">
                    <v-card rounded="lg" variant="text">
                        <v-card-title class="pa-0">Кадры</v-card-title>
                        <v-card-subtitle class="pa-0">Топ кадры из аниме</v-card-subtitle>
                        <v-row no-gutters justify="center" style="width: 100%; height: 100%;">
                            <v-col v-if="screenshots.length === 0" cols="6" xxl="3" xl="3" lg="3" md="3" sm="3" xs="5"
                                   class="pa-2" v-for="n in 4">
                                <v-skeleton-loader
                                    type="image"
                                >
                                </v-skeleton-loader>
                            </v-col>
                            <v-col v-else cols="6" xxl="3" xl="3" lg="3" md="3" sm="3" xs="5" class="pa-2"
                                   v-for="(image, index) in screenshots">
                                <v-img
                                    width="100%"
                                    aspect-ratio="1.6"
                                    rounded="lg"
                                    cover
                                    :lazy-src="image"
                                    :src="image"
                                >
                                </v-img>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>
            </section>
            <!-- player solo -->
            <section>
                <v-container
                    style="max-width: var(--ota-ku-max-width); padding: 0 10px 10px 10px; align-items: center;">
                    <div style="width: 100%;  aspect-ratio: 177 / 100;">
                        <iframe
                            :src="'//kodik.cc/find-player?shikimoriID=' + currentAnime + '&prioritizeTranslations=[' + currentAnimeVoice + ']&blockInCountries=turkey,azerbadjan&types=anime,anime-serial'"
                            width="100%" height="100%" frameborder="0" allowfullscreen
                            allow="autoplay *; fullscreen *"></iframe>
                    </div>
                </v-container>
            </section>
            <!-- most anime List-->
            <section>
                <v-container
                    style="max-width: var(--ota-ku-max-width); padding: 0 10px 10px 10px; align-items: center;">
                    <v-card variant="text" rounded="lg">
                        <v-card-title class="pa-0">Похожые релизы</v-card-title>
                        <v-card-subtitle class="pa-0">Аниме и фильмы связеные с франшизой</v-card-subtitle>
                        <v-row no-gutters>
                            <v-col v-if="relatedAnime.length === 0" v-for="n in 4" cols="6" xxl="3" xl="3" lg="3" md="4" sm="4" xs="5" class="pa-2">
                                <v-skeleton-loader
                                    type="image, list-item-two-line"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col v-else cols="6" xxl="3" xl="3" lg="3" md="4" sm="4" xs="5" class="pa-2"
                                   v-for="related in relatedAnime" @click="this.openAnime(related.id);">
                                <v-card link variant="text">
                                    <v-img
                                        width="100%"
                                        aspect-ratio="1.6"
                                        rounded="lg"
                                        cover
                                        :lazy-src="related.main2xUrl"
                                        :src="related.main2xUrl"
                                    >
                                    </v-img>
                                    <v-card-title class="pa-0 pt-2" style="font-size: 0.9em">{{
                                            related.russian
                                        }}
                                    </v-card-title>
                                    <v-card-subtitle class="pa-0 pt-1" style="font-size: 0.8em">
                                        {{ related.relationRu}}
                                    </v-card-subtitle>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-container>
            </section>
        </v-main>
        <v-main v-else>
            <div class="position-absolute d-flex"
                 style="background-color: #121212; align-items: center; justify-content: center; z-index: 1010; width: 100vw; height: 100dvh;">
                <div class="loader"></div>
            </div>
        </v-main>
    </v-layout>
</template>

<script lang="ts">
import axios from 'axios';
import {cleanDescription} from "../ts/cleanDescription";
import {formatDate} from "../ts/formatDate";
import moment from 'moment-timezone';
import {openAnime} from "../ts/goTo.ts";

export default {
    mounted() {
        const animeId = this.$route.query.animeId;
        this.locale = moment.tz.guess();
        if (animeId) {
            this.fetchAnime(animeId);
            this.currentAnime = animeId;
        } else {
            this.goBack();
        }

        this.$watch(
            () => this.$route.query.animeId,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    this.fetchAnime(newValue);
                    this.currentAnime = newValue;
                }
            }
        );
    },
    data() {
        return {
            animeList: null,
            currentAnime: '',
            currentAnimeVoice: '',
            genres: [],
            studios: [],
            screenshots: [],
            locale: 'ru',
            mostList: [],
            openAnime,
        };
    },
    methods: {
        formatDate,
        cleanDescription,
        async fetchAnime(animeId: number) {
            try {
                const response = await axios.post('https://shikimori.one/api/graphql', {
                    query: `
                        query {
                          animes(ids: "${animeId}" limit: 1) {
                            name
                            russian
                            english
                            episodes
                            kind
                            status
                            description
                            nextEpisodeAt
                            genres { id russian }
                            studios { id name }
                            poster { originalUrl }
                            screenshots { id originalUrl }
                            related { id anime { id russian poster { main2xUrl } } relationRu }
                          }
                        }
                    `
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (response.status !== 200) {
                    this.$router.push(`/error`);
                } else {
                    this.animeList = response.data.data.animes[0];
                    this.genres = this.animeList.genres.map(item => item.russian);
                    this.studios = this.animeList.studios.map(item => item.name);
                    this.screenshots = this.animeList.screenshots.slice(0, 4).map(item => item.originalUrl);
                    this.relatedAnime = this.animeList.related
                        .filter(item => item.anime !== null)
                        .map(item => ({
                            id: item.anime.id,
                            russian: item.anime.russian,
                            main2xUrl: item.anime.poster.main2xUrl,
                            relationRu: item.relationRu
                        }));
                    console.log(this.relatedAnime)
                }
            } catch (error) {
                this.$router.push(`/error`);
            }
        },
        goBack() {
            window.history.back();
        },
    },
}
</script>

<style scoped lang="sass">
.loader
    width: 40px
    padding: 6px
    aspect-ratio: 1
    border-radius: 50%
    background: #e3e3e3
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box
    -webkit-mask: var(--_m)
    mask: var(--_m)
    -webkit-mask-composite: source-out
    mask-composite: subtract
    animation: l3 1s infinite linear

    @keyframes l3
        to
            transform: rotate(1turn)

.anime-background-shadow
    width: 100%
    height: 100%
    background: rgb(18, 18, 18)
    background: linear-gradient(0deg, rgba(18, 18, 18, 1) 5%, rgba(18, 18, 18, 0.2049194677871149) 100%)

.anime-background-image
    height: 500px

.anime-and-other-info-v-card-text
    span
        font-weight: bold

        i
            font-weight: normal
            font-style: normal
            opacity: 0.7

@media screen and (max-width: 768px)
    .name-and-other-anime-poster
        display: none

    .name-and-other-anime-information
        width: 100% !important
</style>
