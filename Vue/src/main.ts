import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import config from 'devextreme/core/config';
import './assets/main.css';
import App from './App.vue';
import router from './router';
import { licenseKey } from './devextreme-license';

config({ licenseKey });

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
