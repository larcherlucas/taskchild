import './styles/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './plugins/i18n';
import App from './App.vue';
import router from './router';
import errorHandler from './plugins/errorHandler';

const app = createApp(App);

// Plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(errorHandler);

app.use(i18n);
app.mount('#app');
