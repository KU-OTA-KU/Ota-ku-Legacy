import axios from "axios";

const state = {
    topSliderAnimeList: [],
};

const getters = {
    getTopSliderAnimeLIst(state) {
        return state.topSliderAnimeList;
    },
};

const mutations = {
    SET_TOP_SLIDER_ANIME_LIST(state, animeList) {
        state.topSliderAnimeList = animeList;
    },
};

const actions = {
    async getTopSliderAnimeLIst({commit}) {
        try {
            const response = await axios.post("https://shikimori.one/api/graphql", {
                query: `
            query {
                animes(season: "2023_2024", limit: 5, order: popularity, status: "released", kind: "tv") {
                    id
                    name
                    russian
                    score
                    poster {
                        originalUrl
                        miniUrl
                    }
                    description
                }
            }
          `
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            });

            commit('SET_TOP_SLIDER_ANIME_LIST', response.data.data.animes);
        } catch (error) {
            this.$router.push('/error');
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
