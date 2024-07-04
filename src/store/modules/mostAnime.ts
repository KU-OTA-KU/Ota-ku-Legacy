import axios from "axios";

const state = {
    mostAnimeList: [],
    mostAnimeListLastUpdateTime: '',
};

const getters = {
    getMostAnimeList(state) {
        return state.mostAnimeList;
    },
};

const mutations = {
    SET_MOST_ANIME_LIST(state, animeList) {
        state.mostAnimeList = animeList;
    },
};

const actions = {
    async getMostAnimeList({commit}) {
        try {
            const response = await axios.post("https://shikimori.one/api/graphql", {
                query: `
            query {
              ongoingAnime: animes(season: "2023_2024", limit: 6, order: popularity, status: "ongoing", kind: "tv") {
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
              anonseAnime: animes(season: "2024", limit: 6, order: name, status: "anons", kind: "tv") {
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
              topAnime: animes(limit: 6, order: ranked, status: "released", kind: "tv") {
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
              releasedAnime: animes(limit: 6, order: popularity, status: "released", kind: "tv") {
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
              filmsAnime: animes(season: "2020_2024", limit: 6, order: popularity, status: "released", kind: "movie") {
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
              ovaAnime: animes(season: "2022_2024", limit: 6, order: popularity, status: "released", kind: "ova") {
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
              onaAnime: animes(season: "2022_2024", limit: 6, order: popularity, status: "released", kind: "ona") {
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
                throw new Error("Failed to fetch data");
            }

            const data = response.data;
            const animeList = [
                {
                    title: "Онгоинги",
                    description: "Вступай в новые эпизоды приключений, следи за сюжетом!",
                    anime: data.data.ongoingAnime,
                    moreLink: 'status=ongoing&order=popularity',
                },
                {
                    title: "Популярные ONA",
                    description: "ONA с уникальными и захватывающими сюжетами!",
                    anime: data.data.onaAnime,
                    moreLink: 'kind=ona&order=popularity',
                },
                {
                    title: "Топ аниме",
                    description: "Погружайся в лучшие произведения аниме!",
                    anime: data.data.topAnime,
                    moreLink: 'kind=tv&order=popularity',
                },
                {
                    title: "Популярные OVA",
                    description: "Эксклюзивные анимационные произведения!",
                    anime: data.data.ovaAnime,
                    moreLink: 'kind=ova&order=popularity',
                },
                {
                    title: "Анонсы",
                    description: "Узнавай первым о предстоящих релизах!",
                    anime: data.data.anonseAnime,
                    moreLink: 'status=anons&order=popularity',
                },
                {
                    title: "Завершенные",
                    description: "Проведи время в компании классических аниме!",
                    anime: data.data.releasedAnime,
                    moreLink: 'released=anons&order=popularity',
                },
                {
                    title: "Фильмы",
                    description: "Эксклюзивная коллекция фильмов для наслаждения!",
                    anime: data.data.filmsAnime,
                    moreLink: 'kind=movie&released=anons&order=popularity',
                },
            ];

            commit('SET_MOST_ANIME_LIST', animeList);
        } catch (error) {
            console.log(error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
