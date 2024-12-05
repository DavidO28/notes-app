import { createApp } from 'vue'

import './assets/main.css'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  theme: {
    defaultTheme: 'light',
  },
})

app.use(vuetify)
app.use(router)

app.mount('#app')
