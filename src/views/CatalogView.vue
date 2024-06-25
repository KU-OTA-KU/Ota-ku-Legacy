<template>
  <primary-header/>
  <v-layout>
    <v-main tag="section">
      <v-container style="max-width: var(--ota-ku-max-width); padding: 20px 10px 0 10px; align-items: center;">
        <v-breadcrumbs :items="['Главная Страница', 'Каталог']" class="pa-0" style="font-size: 0.8em">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right" color="#9e9e9e"></v-icon>
          </template>
        </v-breadcrumbs>
        <anime-catalog/>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script>
import PrimaryHeader from "@/components/PrimaryHeader.vue";
import AnimeCatalog from '@/components/AnimeCatalog.vue';
import {defineComponent} from "vue";

export default defineComponent({
  name: "CatalogView",

  components: {
    PrimaryHeader,
    AnimeCatalog,
  },
});
</script>