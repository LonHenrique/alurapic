<template>
  <div>
    <h2 class="titulo">{{ titulo }}</h2>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" @input="filtro = $event.target.value" :placeholder="placeholder">    
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">       
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva 
            v-meu-transform:scale.animate="1.2" 
            :url="foto.url" 
            :titulo="foto.titulo"
          />

          <router-link :to="{ name : 'editar', params:{ id: foto._id }}">
            <meu-botao tipo="button" rotulo="Editar"></meu-botao>
          </router-link>

          <meu-botao 
            rotulo="Remover" 
            tipo="button" 
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"            
          />          

        </meu-painel>          
      </li>
    </ul>
  </div>
</template>

<script>

  import Painel from '../shared/panel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
  import Botao from '../shared/botao/Botao.vue';
  import transform from '../../directives/Transform.js';
  import FotoService from '../../domain/foto/FotoService.js';

  export default {

    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
    },

    directives: {
      'meu-transform' : transform
    },

    data () {

      return{

        titulo : 'Minhas Séries',  
        fotos : [],
        filtro: '',
        placeholder: 'Encontre a Série',
        mensagem: ''
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

    methods: {       

      remove(foto) {

      this.service
        .apaga(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          }, 
          err => {
            this.mensagem = err.message;
          }
        );
      }     
    },   

    created(){

      this.service = new FotoService(this.$resource);

      this.service
        .lista()
        .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);
    } 
  }  

</script>

<style scoped>    
  .titulo {    
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #157fe9;
    font-size: 18px;
    margin-top: 15px;    
  }  

  .centralizado {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color: red;
    font-size: 18px;
    
  }
  .lista-fotos {
    list-style: none;            
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }


  .filtro{
    width: 20%;    
    border-radius: 5px;
    padding: 10px;
    margin-left: 50px;    
  }
</style>
