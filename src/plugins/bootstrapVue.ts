import type { App } from 'vue';
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

export default {
  install: (app: App): void => {
    app.use(BootstrapVue3);
  }
};