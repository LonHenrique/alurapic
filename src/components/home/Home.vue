<template>
  <div>
    <h2 class="titulo">{{ titulo }}</h2>
    <input type="search" class="filtro" @input="filtro = $event.target.value" :placeholder="placeholder">    
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">       
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform="{ i:15, animacao:true}" :url="foto.url" :titulo="foto.titulo"/>
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

  export default {

    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao
  },

    data () {
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

    methods: {

      remove(foto){
        alert('Remover a foto' + foto.titulo);
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
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #157fe9;
    font-size: 18px;
    margin-top: 15px;    
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
