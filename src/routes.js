import Home from '../src/components/home/Home.vue';
import Cadastro from '../src/components/cadastro/Cadastro.vue';

export const routes = [
    { path: '', name: 'home', component: Home, titulo:'Home', menu: true },
    { path: '/cadastro', name: 'cadastro', component: Cadastro, titulo:'Cadastro', menu: true },
    { path: '/cadastro/:id', name: 'editar', component: Cadastro, titulo:'Editar', menu: false },
    { path: '*', component: Home, menu: false}
];  
