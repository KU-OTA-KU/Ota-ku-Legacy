import { createStore } from "vuex";
import mostAnime from "./modules/mostAnime";
import topSlider from "./modules/topSlider";
export default createStore({
  modules: {
    mostAnime,
    topSlider,
  },
});
