<template> 
    <div class="painel">
        <h4 class="painel-titulo" @dblclick="visivel = !visivel">{{ titulo }}</h4>        
        <transition name="painel-fade">
          <div class="painel-conteudo" v-show="visivel">        
            <slot></slot>
          </div>
        </transition>
    </div>        
</template>

<script>
  export default {    

    props: ['titulo'],

    data(){
      return {
        visivel: true
      }
    }    
  }  
</script>

<style>
   .painel {
    padding: 2px;
    border: solid 2px grey;
    display: inline-block;
    margin: 7px;
    box-shadow: 1px 1px 5px grey;
    width: 275px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    
    font-family: "Gaegu", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;    
    background: lightblue;
    margin: 5px;
    padding: 5px;
    text-transform: uppercase;
  }

  .painel-fade-enter, .painel-fade-leave-active {
    opacity: 0;
  }

  .painel-fade-enter-active, .painel-fade-leave-active {
    transition: opacity .2s;
  }

  .painel-conteudo {
    overflow: hidden;
  }
</style>
