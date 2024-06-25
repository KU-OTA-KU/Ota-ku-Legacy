<template>
    <v-card class="mt-4 mb-13" variant="text">
        <v-card-title class="pa-0">Каталог релизов</v-card-title>
        <v-card-subtitle class="pa-0">Самые новые и свежие эпизоды в каталоге</v-card-subtitle>
        <v-row no-gutters class="mt-4">
            <v-text-field label="Поиск..." variant="solo-filled" hide-details density="comfortable"
                          v-model="searchQuery" @input="filterAnimeList(searchQuery)"></v-text-field>
            <v-btn :icon="sidebarVisible ? 'mdi-close' : 'mdi-filter'" rounded="" class="ml-4" variant="tonal"
                   density="default" @click="toggleSidebar">
            </v-btn>
        </v-row>
        <v-row no-gutters class="mt-4 d-flex ga-4 flex-row flex-nowrap catalog-container">
            <v-card max-width="100%" width="100%" rounded="lg">
                <v-list>
                    <div v-if="animeCatalogListSkeleton">
                        <v-card variant="text" class="pa-0" v-for="n in 10" :key="n">
                            <v-skeleton-loader
                                class="mb-3"
                                type="list-item-three-line"
                            >
                            </v-skeleton-loader>
                        </v-card>
                    </div>
                    <v-card v-else @click="openDialog(anime)" v-if="animeList.data && animeList.data.animes" v-for="anime in animeList.data.animes"
                            :key="anime.id" link rounded="0" class="catalog-content-containers pa-5" variant="text"
                            style="border-bottom: 1px solid rgba(158,158,158,0.20)">
                        <v-row no-gutters class="pt-2 pb-2 flex-nowrap">
                            <v-img
                                :lazy-src="anime.poster.main2xUrl"
                                :src="anime.poster.originalUrl"
                                rounded="lg"
                                cover
                                class="pointer-events-none user-select-none mr-3 catalog-content-containers-v-image overflow-hidden"
                            >
                            </v-img>
                            <div style="width: 100%;">
                                <v-card-title class="pa-0 text-wrap">{{ anime.russian }}</v-card-title>
                                <v-card-subtitle class="pa-0 d-flex ga-1 pt-1 pb-2 text-wrap" style="font-size: 0.8em">
                                    Тип: {{ anime.kind }}
                                    <span>•</span>
                                    Оценка: {{ anime.score }}
                                </v-card-subtitle>
                                <v-card-text class="pa-0 catalog-content-container-card-text"
                                             style="font-family: 'Inter', sans-serif;">
                                    {{ cleanDescription(anime.description) }}
                                </v-card-text>
                            </div>
                        </v-row>
                    </v-card>
                </v-list>
            </v-card>
            <v-card v-show="sidebarVisible" width="100%" class="sidebar" rounded="lg" height="100%"
                    position="relative" style="background-color: transparent">
                <div class="content-wrapper d-flex flex-column ga-5 pb-5">
                    <v-form class="contents pt-2 position-relative"
                            style="height: 100%; background-color: #212121; border-radius: 6px">
                        <v-card variant="text" class="anime-filter-content-v-card pl-4 pr-4" width="100%">
                            <v-card-title class="pa-0" style="font-size: 1em">Статус</v-card-title>
                            <v-card-subtitle class="pa-0" style="font-size: 0.8em; white-space: normal !important;">
                                Пожалуйста, выберите статус, в котором находится аниме, из предложенных вариантов:
                            </v-card-subtitle>
                            <v-select density="comfortable" variant="outlined" clearable class="mt-2"
                                      :item-props="itemProps" :items="statusItems"
                                      label="Выбирите Статус"></v-select>
                        </v-card>
                        <v-card variant="text" class="anime-filter-content-v-card pl-4 pr-4" width="100%">
                            <v-card-title class="pa-0" style="font-size: 1em">Тип</v-card-title>
                            <v-card-subtitle class="pa-0" style="font-size: 0.8em; white-space: normal !important;">
                                Пожалуйста, выберите один или несколько типов аниме из списка:
                            </v-card-subtitle>
                            <v-select multiple chips density="comfortable" variant="outlined" clearable class="mt-2"
                                      :item-props="itemProps" :items="kindItems"
                                      label="Выбирите Тип"></v-select>
                        </v-card>
                        <v-card variant="text" class="anime-filter-content-v-card pl-4 pr-4" width="100%">
                            <v-card-title class="pa-0" style="font-size: 1em">Жанры</v-card-title>
                            <v-card-subtitle class="pa-0" style="font-size: 0.8em; white-space: normal !important;">
                                Пожалуйста, укажите жанры для фильтрации наших релизов:
                            </v-card-subtitle>
                            <v-select multiple chips density="comfortable" variant="outlined" clearable class="mt-2"
                                      :item-props="itemProps" :items="genreItems"
                                      label="Выбирите Жанры"></v-select>
                        </v-card>
                        <v-card variant="text" class="anime-filter-content-v-card pl-4 pr-4" width="100%">
                            <v-card-title class="pa-0" style="font-size: 1em">Cортировка</v-card-title>
                            <v-card-subtitle class="pa-0" style="font-size: 0.8em; white-space: normal !important;">
                                Пожалуйста, выберите предпочтительный порядок сортировки из списка опций:
                            </v-card-subtitle>
                            <v-select density="comfortable" variant="outlined" clearable class="mt-2"
                                      :item-props="itemProps" :items="sortItems"
                                      label="Cортировать По"></v-select>
                        </v-card>
                        <v-card variant="text" class="anime-filter-content-v-card pl-4 pr-4" width="100%">
                            <v-card-title class="pa-0" style="font-size: 1em">Сезон</v-card-title>
                            <v-card-subtitle class="pa-0" style="font-size: 0.8em; white-space: normal !important;">
                                Пожалуйста, выберите желаемый сезон из предложенных вариантов:
                            </v-card-subtitle>
                            <v-select density="comfortable" variant="outlined" clearable class="mt-2"
                                      :item-props="itemProps" :items="yearItems"
                                      label="Выбирите Сезон"></v-select>
                        </v-card>
                        <v-card variant="text" class="anime-filter-content-v-card pl-4 pr-4" width="100%">
                            <v-card-title class="pa-0" style="font-size: 1em">Оценка</v-card-title>
                            <v-card-subtitle class="pa-0" style="font-size: 0.8em; white-space: normal !important;">
                                Выберите параметры для сортировки аниме по оценкам:
                            </v-card-subtitle>
                            <v-select density="comfortable" variant="outlined" clearable class="mt-2"
                                      :item-props="itemProps" :items="ratingItems"
                                      label="Выбирите Оценку"></v-select>
                        </v-card>
                    </v-form>
                    <div class="submit-filter">
                        <div class="submit-filter-inner-container pa-4 d-flex ga-4"
                             style="background-color: #212121; border-radius: 6px;">
                            <v-btn theme="customDarkTheme" variant="flat" prepend-icon="mdi-check-all">
                                Поиск
                            </v-btn>
                            <v-btn thtme="customDarkTheme" variant="text" prepend-icon="mdi-window-close">
                                Сбросить
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-row>
    </v-card>

    <anime-dialog
        :selectedAnime="selectedAnime"
        ref="animeDialogRef"
    />
</template>

<script lang="ts">
import axios from "axios";
import {cleanDescription} from "@/ts/cleanDescription.ts";
import {defineComponent, ref} from "vue";
import debounce from 'lodash/debounce';
import AnimeDialog from "@/components/others/AnimeDialog.vue";

export default {
    components: {
        AnimeDialog,
    },
    mounted() {
        this.fetchAllData(10, 'popularity', "released", "");
        let sidebar = document.getElementsByClassName("sidebar")[0];
        let sidebar_content = document.getElementsByClassName("content-wrapper")[0];

        window.onscroll = () => {
            let scrollTop = window.scrollY;
            let viewportHeight = window.innerHeight;
            let contentHeight = sidebar_content.getBoundingClientRect().height;
            let sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;
            if (scrollTop >= contentHeight - viewportHeight + sidebarTop && window.innerWidth > 1024) {
                sidebar_content.style.transform = `translateY(-${contentHeight - viewportHeight + sidebarTop}px)`;
                sidebar_content.style.position = "fixed";
            } else {
                sidebar_content.style.transform = "";
                sidebar_content.style.position = "";
            }
        }

        window.onresize = () => {
            if (window.innerWidth <= 1024) {
                sidebar_content.style.position = "relative";
                sidebar_content.style.transform = "";
            } else {

            }
        };

        // in computer mode open sidebar for responsibility
        if (window.innerWidth >= 1024) {
            this.sidebarVisible = true
        }
    },
    data: () => ({
        animeList: [],
        selectedAnime: {},
        cleanDescription,
        sidebarVisible: false,
        animeCatalogListSkeleton: true,
        statusItems: [
            {
                id: 'anons',
                name: 'Анонсировано',
                subtitle: 'Ожидается скорый выход',
            },
            {
                id: 'ongoing',
                name: 'Сейчас выходит',
                subtitle: 'Новые эпизоды регулярно появляются',
            },
            {
                id: 'released',
                name: 'Вышедшее',
                subtitle: 'Доступны для просмотра все эпизоды',
            },
        ],
        kindItems: [
            {
                id: 'tv',
                name: 'ТВ Сериал',
                subtitle: 'Несколько эпизодов сериала',
            },
            {
                id: 'ova',
                name: 'OVA',
                subtitle: 'Отдельные выпуски анимации',
            },
            {
                id: 'movie',
                name: 'Фильм',
                subtitle: 'Полнометражный',
            },
            {
                id: 'ona',
                name: 'ONA',
                subtitle: 'Анимация для интернета',
            },
        ],
        genreItems: [
            {id: '5', name: 'Авангард', subtitle: 'Экспериментальный жанр'},
            {id: '543', name: 'Гурман', subtitle: 'Кулинарные приключения'},
            {id: '8', name: 'Драма', subtitle: 'Эмоциональные сюжеты'},
            {id: '4', name: 'Комедия', subtitle: 'Юмор и веселье'},
            {id: '36', name: 'Повседневность', subtitle: 'Жизненные истории'},
            {id: '2', name: 'Приключения', subtitle: 'Увлекательные путешествия'},
            {id: '22', name: 'Романтика', subtitle: 'Любовные истории'},
            {id: '37', name: 'Сверхъестественное', subtitle: 'Силы за гранью'},
            {id: '30', name: 'Спорт', subtitle: 'Спортивные соревнования'},
            {id: '7', name: 'Тайна', subtitle: 'Загадочные сюжеты'},
            {id: '117', name: 'Триллер', subtitle: 'Напряженные моменты'},
            {id: '14', name: 'Ужасы', subtitle: 'Страшные истории'},
            {id: '24', name: 'Фантастика', subtitle: 'Научные миры'},
            {id: '10', name: 'Фэнтези', subtitle: 'Магические миры'},
            {id: '1', name: 'Экшен', subtitle: 'Боевое искусство'},
            {id: '9', name: 'Этти', subtitle: 'Романтические комедии'},
            {id: '143', name: 'Антропоморфизм', subtitle: 'Человекообразные'},
            {id: '119', name: 'CGDCT', subtitle: 'Милые девочки'},
            {id: '17', name: 'Боевые искусства', subtitle: 'Боевые техники'},
            {id: '32', name: 'Вампиры', subtitle: 'Истории о вампирах'},
            {id: '104', name: 'Взрослые персонажи', subtitle: 'Взрослая жизнь'},
            {id: '103', name: 'Видеоигры', subtitle: 'Мир игр'},
            {id: '38', name: 'Военное', subtitle: 'Военная тематика'},
            {id: '141', name: 'Выживание', subtitle: 'Борьба за жизнь'},
            {id: '35', name: 'Гарем', subtitle: 'Много любовных интересов'},
            {id: '3', name: 'Гонки', subtitle: 'Автоспорт'},
            {id: '112', name: 'Гэг-юмор', subtitle: 'Комические ситуации'},
            {id: '39', name: 'Детектив', subtitle: 'Расследования'},
            {id: '105', name: 'Жесткость', subtitle: 'Жестокие сцены'},
            {id: '134', name: 'Забота о детях', subtitle: 'Детская забота'},
            {id: '146', name: 'Игра с высокими ставками', subtitle: 'Риск и азарт'},
            {id: '145', name: 'Идолы (жен.)', subtitle: 'Женские идолы'},
            {id: '150', name: 'Идолы (муж.)', subtitle: 'Мужские идолы'},
            {id: '108', name: 'Изобразительное искусство', subtitle: 'Визуальное искусство'},
            {id: '142', name: 'Исполнительское искусство', subtitle: 'Сценические выступления'},
            {id: '13', name: 'Исторический', subtitle: 'Исторические события'},
            {id: '130', name: 'Исэкай', subtitle: 'Другие миры'},
            {id: '140', name: 'Иясикэй', subtitle: 'Успокаивающие сюжеты'},
            {id: '102', name: 'Командный спорт', subtitle: 'Командные соревнования'},
            {id: '29', name: 'Космос', subtitle: 'Космические приключения'},
            {id: '144', name: 'Кроссдрессинг', subtitle: 'Смена одежды'},
            {id: '137', name: 'Культура отаку', subtitle: 'Отаку культура'},
            {id: '107', name: 'Любовный многоугольник', subtitle: 'Сложные отношения'},
            {id: '135', name: 'Магическая смена пола', subtitle: 'Смена пола'},
            {id: '124', name: 'Махо-сёдзё', subtitle: 'Волшебные девочки'},
            {id: '147', name: 'Медицина', subtitle: 'Медицинские истории'},
            {id: '18', name: 'Меха', subtitle: 'Роботы и машины'},
            {id: '6', name: 'Мифология', subtitle: 'Мифические истории'},
            {id: '19', name: 'Музыка', subtitle: 'Музыкальные сюжеты'},
            {id: '149', name: 'Образовательное', subtitle: 'Обучающие сюжеты'},
            {id: '138', name: 'Организованная преступность', subtitle: 'Преступные синдикаты'},
            {id: '20', name: 'Пародия', subtitle: 'Юмористические пародии'},
            {id: '148', name: 'Питомцы', subtitle: 'Домашние животные'},
            {id: '40', name: 'Психологическое', subtitle: 'Психологические драмы'},
            {id: '111', name: 'Путешествие во времени', subtitle: 'Путешествия через время'},
            {id: '139', name: 'Работа', subtitle: 'Профессиональная жизнь'},
            {id: '125', name: 'Реверс-гарем', subtitle: 'Много мужчин'},
            {id: '106', name: 'Реинкарнация', subtitle: 'Перерождение'},
            {id: '151', name: 'Романтический подтекст', subtitle: 'Скрытая романтика'},
            {id: '21', name: 'Самураи', subtitle: 'Истории о самураях'},
            {id: '118', name: 'Спортивные единоборства', subtitle: 'Боевые виды спорта'},
            {id: '11', name: 'Стратегические игры', subtitle: 'Игры и стратегии'},
            {id: '31', name: 'Супер сила', subtitle: 'Сверхспособности'},
            {id: '114', name: 'Удостоено наград', subtitle: 'Награжденные произведения'},
            {id: '131', name: 'Хулиганы', subtitle: 'Истории о хулиганах'},
            {id: '23', name: 'Школа', subtitle: 'Школьные истории'},
            {id: '136', name: 'Шоу бизнес', subtitle: 'Мир шоу бизнеса'}
        ],
        sortItems: [
            {id: 'ranked', name: 'По рейтингу', subtitle: 'Сортировка по рейтингу'},
            {id: 'popularity', name: 'По популярности', subtitle: 'Сортировка по популярности'},
            {id: 'name', name: 'По алфавиту', subtitle: 'Сортировка по алфавиту'},
            {id: 'aired_on', name: 'По дате выхода', subtitle: 'Сортировка по дате выхода'},
            {id: 'status', name: 'Случайно', subtitle: 'Случайная сортировка'},
            {id: 'episodes', name: 'По количеству серий', subtitle: 'Сортировка по количеству серий'},
            {id: 'id', name: 'По ID', subtitle: 'Сортировка по идентификатору'}
        ],
        yearItems: [
            {id: '2024', name: '2024 год', subtitle: 'Аниме 2024 года'},
            {id: '2023', name: '2023 год', subtitle: 'Аниме 2023 года'},
            {id: '2000_2024', name: '2000-2024', subtitle: 'Аниме с 2000 по 2024'},
            {id: '2020_2024', name: '2020-2024', subtitle: 'Аниме с 2020 по 2024'},
            {id: '2021_2022', name: '2021-2022', subtitle: 'Аниме с 2021 по 2022'},
            {id: '2016_2020', name: '2016-2020', subtitle: 'Аниме с 2016 по 2020'},
            {id: '2010_2015', name: '2010-2015', subtitle: 'Аниме с 2010 по 2015'},
            {id: '2000_2009', name: '2000-2009', subtitle: 'Аниме с 2000 по 2009'},
            {id: '1980_1999', name: '1999-е годы', subtitle: 'Аниме 1980-1999 годов'},
            {id: '1970_1980', name: '1980-е годы', subtitle: 'Аниме 1970-1980 годов'},
            {id: '1968_1999', name: 'Динозавры 1968', subtitle: 'Аниме 1968-1999 годов'}
        ],
        ratingItems: [
            {id: 'none', name: 'Без оценки', subtitle: 'Нет возрастных ограничений'},
            {id: 'g', name: 'Все оценки', subtitle: 'Для всех возрастов'},
            {id: 'pg', name: 'PG', subtitle: 'Для детей'},
            {id: 'pg_13', name: 'PG-13', subtitle: 'Для детей 13 лет'},
            {id: 'r', name: 'R', subtitle: 'Для подростков 17+'},
            {id: 'r_plus', name: 'R+', subtitle: 'Умеренная нагота'}
        ],
    }),
    methods: {
        openDialog(anime) {
            this.selectedAnime = anime;
            this.$refs.animeDialogRef.openDialog();
        },
        itemProps(item) {
            return {
                id: item.id,
                title: item.name,
                subtitle: item.subtitle,
            }
        },
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
        },
        async fetchAllData(animeLimit: number, sortItems: string, statusItems: string, searchQuery: string) {
            try {
                const response = await axios.post("https://shikimori.one/api/graphql", {
                    query: `
              query {
                animes(limit: ${animeLimit}, order: ${sortItems}, status: "${statusItems}", search: "${searchQuery}", kind: "tv", censored: false) {
                  id
                  name
                  russian
                  kind
                  score
                  description
                  videos { playerUrl }
                  poster {
                    main2xUrl
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


                this.animeList = response.data;
                this.animeCatalogListSkeleton = false;
                console.log(this.animeList)
            } catch (error) {
                console.error(error);
            }
        },

        filterAnimeList: debounce(function (searchQuery: string) {
            if (searchQuery !== '') {
                this.fetchAllData(10, 'name', '', searchQuery);
            } else {
                this.fetchAllData(10, 'popularity', "released", "");
            }

        }, 1000),
    },
};
</script>

<style scoped lang="sass">
.sidebar
    max-width: var(--filter-slider-max-width)

    .content-wrapper
        .anime-filter-content-v-card
            width: 100%
            max-width: var(--filter-slider-max-width)
            min-width: var(--filter-slider-max-width)


.catalog-content-containers
    .catalog-content-containers-v-image
        max-width: 180px
        width: 100%
        aspect-ratio: 0.7

        @media screen and (max-width: 1170px)
            &
                max-width: 150px

        @media screen and (max-width: 520px)
            &
                max-width: 110px

    .catalog-content-container-card-text
        display: -webkit-box
        -webkit-line-clamp: 4
        -webkit-box-orient: vertical
        overflow: hidden
        color: #9e9e9e

        @media screen and (max-width: 425px)
            &
                display: none

@media screen and (max-width: 1024px)
    .catalog-container
        flex-direction: column-reverse !important

    .sidebar
        max-width: 100%

        .content-wrapper
            .anime-filter-content-v-card
                width: 100%
                max-width: 100%
                min-width: 100%
</style>
