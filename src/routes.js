import Home from '../src/components/home/Home.vue';
import Cadastro from '../src/components/cadastro/Cadastro.vue';

export const routes = [
    { path: '', component: Home, titulo:'Home' },
    { path: '/cadastro', component: Cadastro, titulo:'Cadastro' }
];  
