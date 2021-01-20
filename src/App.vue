<template>
  <div class="corpo">
    
    <meu-menu :rotas="routes"/>

    <router-view></router-view>
    
  </div>
</template>

<script>

import { routes } from './routes'
import Menu from '../src/components/shared/menu/Menu.vue'

  export default {

    components: {
      'meu-menu': Menu
    },

    data(){
      return {
        routes
      }
    }
  }  
</script>

<style>
  .corpo {    
    width: 100%;
  }  
</style>
