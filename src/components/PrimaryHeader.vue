<template>
  <v-layout style="height: 65px;" class="header-navigation">
    <v-app-bar tag="header" color="black" scroll-behavior="elevate hide" height="65">
      <v-container class="d-flex" style="max-width: var(--ota-ku-max-width); padding: 0; align-items: center">
        <v-col align-self="center" class="d-flex">
          <v-toolbar-title style="max-width: 130px; min-width: 130px; margin-right: 20px" @click="navigateToHome"
                           class="cursor-pointer">
            <v-img class="ota-ku-ru-icon user-select-none"
                   src="/img/ota-ku-kashima.png"
                   width="100%"
                   alt="Logo"
            ></v-img>
          </v-toolbar-title>
          <v-toolbar-items class="header-toolbar-items ga-2 align-center d-flex">
            <v-btn :variant="getButtonVariant('/catalog')" class="text-capitalize" active to="/catalog"
                   rounded="lg" size="small" theme="customDarkTheme" height="30">
              Каталог
            </v-btn>
            <v-btn :variant="getButtonVariant('/releases')" class="text-capitalize" active to="/releases"
                   rounded="lg" size="small" disabled theme="customDarkTheme" height="30">
              Релизы
            </v-btn>
            <v-btn :variant="getButtonVariant('/schedule')" class="text-capitalize" active to="/schedule"
                   rounded="lg" size="small" disabled theme="customDarkTheme" height="30">
              Расписание
            </v-btn>
          </v-toolbar-items>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end ga-1">
          <v-tooltip text="Случайное аниме" location="start">
            <template v-slot:activator="{ props }">
              <v-btn theme="customDarkTheme" v-bind="props" icon="mdi-dice-multiple" variant="text" disabled></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Поиск аниме" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn theme="customDarkTheme" v-bind="props" icon="mdi-magnify" variant="text" disabled></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Ваш профиль" location="end">
            <template v-slot:activator="{ props }">
              <v-btn theme="customDarkTheme" v-bind="props" icon="mdi-account" variant="text" disabled></v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-container>
    </v-app-bar>
  </v-layout>
  <v-layout class="bottom-navigation">
    <v-bottom-navigation tag="nav" class="pa-1 d-flex ga-3" :elevation="5" grow style="background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);" color="surface">
      <v-btn value="recent" width="120px" rounded="xl" :variant="getButtonVariant('/schedule')" disabled theme="customDarkTheme">
        <v-icon>mdi-history</v-icon>
        <span>Сегодня</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn value="favorites" rounded="xl" width="120px" :variant="getButtonVariant('/catalog')" to="/catalog" theme="customDarkTheme">
        <v-icon>mdi-movie-filter</v-icon>
        <span>Каталог</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn value="nearby" width="120px" rounded="xl" :variant="getButtonVariant('/releases')" disabled theme="customDarkTheme">
        <v-icon>mdi-filmstrip-box-multiple</v-icon>
        <span>Библиотека</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script lang="ts">
export default {
  name: "PrimaryHeader",

  methods: {
    navigateToHome() {
      this.$router.push('/');
    },
    getButtonVariant(route: string) {
      return this.$route.path === route ? 'flat' : 'text';
    }
  }
}
</script>

<style lang="sass" scoped>
.bottom-navigation
  display: none

@media screen and (max-width: 768px)
  .header-toolbar-items
    display: none !important

  .bottom-navigation
    display: block !important
</style>
