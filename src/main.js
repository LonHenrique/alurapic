import Vue from 'vue'
import Bootstrap from 'Bootstrap'
import App from './App.vue'

// importa o Vue-Resource para auxiliar no consumo de API
import VueResource from 'vue-resource';

// importar o router para auxilio de navegação entre rotas!
import VueRouter from 'vue-router';

// importar o arquivo de rotas
import { routes } from './routes';

// importando directiva que transforma o tamanho da imagem no card
import './directives/Transform';

// importando a biblioteca de validação de formulário vee-validate
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate';

// importando o css do bootstrap para aplicação
import './bootstrap/dist/css/bootstrap.css';

// importando o custom css para aplicação
import './css/custom.css';

/* Registrando no Global Vue Object para uso das importações */

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes, 
  mode: 'history'
});

Vue.component('ValidationProvider', ValidationProvider); 
Vue.component('ValidationObserver', ValidationObserver);

localize(
  'pt_BR'
)

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
