import Vue from 'vue'
import App from './App.vue'

// importa o Vue-Resource para consumo de API
import VueResource from 'vue-resource';

// importar o router para auxilio de navegação entre rotas!
import VueRouter from 'vue-router';

// importar o arquivo de rotas
import { routes } from './routes';
// registrar

import './directives/Transform';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes, 
  mode: 'history'
});

Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
