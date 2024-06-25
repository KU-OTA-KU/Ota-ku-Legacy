<template>
    <v-layout>
        <v-footer color="secondary" theme="customDarkTheme" class="pt-5  pb-5" elevation="10">
            <v-container class="most-anime-container"
                         style="max-width: var(--ota-ku-max-width); padding: 0 10px; align-items: center;">
                <div class="footer-one-container mb-3">
                    <div class="footer-logo">
                        <v-img src="/img/ota-ku.png" alt="ota-ku website logo"
                               max-width="120px"
                               class="mb-2"
                        ></v-img>
                        <span style="font-size: 1em; font-family: 'Inter', sans-serif; color: #9e9e9e;">Весь контент на сайте предназначен исключительно для личного ознакомления. Мы используем
                              материалы из
                              свободных источников. Если какой-то контент нарушает ваши авторские права, пожалуйста, свяжитесь
                              с
                              нами, и мы незамедлительно удалим его. Однако мы не можем гарантировать, что он не будет
                              загружен на
                              сайт снова другими пользователями. Копирование материала с сайта разрешено только после
                              получения
                              разрешения администрации. Сайт предназначен для лиц старше 16+ лет.
                        </span>
                    </div>
                    <div class="footer-other">
                        <div class="documents">
                            <h3>Документы</h3>
                            <ul>
                                <li>
                                    <router-link class="raco-secondary" to="/privacyPolicy/ru">Политика
                                        конфиденциальности
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="raco-secondary" to="/terms/ru">Пользовательское
                                        соглашение
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="raco-secondary" to="/authors/ru">Правообладатели
                                    </router-link>
                                </li>
                                <!-- <li><a href="#">Правила сайта</a></li>-->
                            </ul>
                        </div>
                        <div class="contacts">
                            <h3>Контакты</h3>
                            <ul>
                                <li>Email: <span>w33bv.gl@gmail.com</span></li>
                                <li>Телефон: <span>+374(94)161-331</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright">
                    <span>© 2023-2024 オタ-KU OTA-KU Все права защищены. Сайт <a class="raco-secondary"
                                                                                 href="https://ota-ku.ru/">Ota-ku.ru</a>
                    </span>
                </div>
            </v-container>
        </v-footer>
    </v-layout>
</template>

<script>
</script>

<style lang="scss" scoped>
.footer-one-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.footer-other {
    display: flex;
    gap: 20px;
    height: 100%;
    justify-content: space-between;
}

.documents,
.contacts {
    white-space: nowrap;
}

.documents h3,
.contacts h3 {
    margin-bottom: 10px;
}

.documents ul,
.contacts ul {
    list-style: none;
    padding: 0;
}

.documents ul li,
.contacts ul li {
    margin-bottom: 5px;
    font-size: 0.9em;
}

.documents ul li a {
    text-decoration: underline;
}

.footer-copyright {
    width: 100%;

    span {
        display: flex;

        a {
            margin-left: 10px;
        }
    }
}

.footer-copyright a {
    text-decoration: underline;
    transition: color 0.2s ease-in-out;
}


@media screen and (max-width: 1440px) {
    .footer-other {
        display: flex;
        gap: 10px;
    }
}

@media screen and (max-width: 1024px) {
    .footer-one-container {
        flex-direction: column;
    }

    .footer-other {
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
}
</style>
