<template>
  <div>
    <h1 class="titulo">{{ titulo }}</h1>
    <input type="search" class="filtro" @input="filtro = $event.target.value" :placeholder="placeholder">    
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">       
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>          
        </meu-painel>          
      </li>
    </ul>
  </div>
</template>

<script>

  import Painel from '../shared/panel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva';
  

  export default {

    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva
  },

    data(){
      return{
        titulo : 'Album de Fotos',        

        fotos : [],

        filtro: '',        

        placeholder: 'Encontre a Imagem'
      }
    }, 

    computed: {

      fotosComFiltro(){
        if(this.filtro){
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo));
        }else{
          return this.fotos
        }
      }
    },

    created (){
      this.$http.get('http://localhost:3000/v1/fotos')
        .then(res => res.json())
        .then(fotos => this.fotos = fotos, err => console.error(err));
    } 
  }
</script>

<style>
  .titulo {
    text-align: center;
  }  

  .lista-fotos {
    list-style: none;            
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }


  .filtro{
    width: 100%;
    display: block;
    border-radius: 5px;
    padding: 10px;
  }
</style>
