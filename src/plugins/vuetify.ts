// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const customDarkOne= {
    dark: true,
    colors: {
        background: '#ffffff',
        surface: '#1763b1',
        primary: '#0047ff',
        'primary-darken-1': '#afa5df',
        secondary: '#212121',
        'secondary-darken-1': '#018786',
        error: '#0337bc',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
        themes: {
            customDarkOne,
        }
    }
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
