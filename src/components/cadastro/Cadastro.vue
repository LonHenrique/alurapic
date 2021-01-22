<template>
    
    <div class="container">
        <h1 class="centralizado">Cadastro</h1>
        <h2 class="centralizado"></h2>

        <form @submit.prevent="grava()">
            <div class="controle">
                <label for="titulo" id="input">TÍTULO</label>
                <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo">
            </div>

            <div class="controle">
                <label for="titulo" id="input">URL</label>
                <input id="url" autocomplete="off" v-model.lazy="foto.url">

            </div>

            <div class="controle">
                <label for="titulo" id="input">DESCRIÇÃO</label>
                <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
            </div>            

            <div class="centralizado">
                <meu-botao rotulo="GRAVAR" tipo="submit"/>
                <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
            </div>

            <div class="">
                <h1>{{ foto.titulo }}</h1>
                <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
                <p>{{ foto.descricao }}</p>                
            </div>

        </form>

    </div>

    
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva';
import Botao from '../shared/botao/Botao';
import Foto from '../../domain/foto/Foto';


    export default {

        components: {

        'imagem-responsiva': ImagemResponsiva,
        'meu-botao': Botao
            
        },

        data() {

            return {

                foto: new Foto(),
                resource: {}
            }
        },        

        methods: {

            grava() {

                console.log(this.foto);

                this.resource
                .save(this.foto)
                .then(() => this.foto = new Foto(), err => console.log(err));

            }
        },

        created() {
            this.resource = this.$resource('v1/fotos{/id}');
        }
    }

</script>

<style scoped>
    .centralizado {
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #157fe9;
        font-size: 18px;
        margin-top: 15px;
        
    }  
    
    .controle {
        font-size: 1.2em;
        margin-bottom: 20px;
    }

    .controle label {
        font-family: 'Poppins', sans-serif;
        color: #157fe9;
        font-size: 18px;
        display: inline-table;
        font-weight: bold;
    }

    .controle label + input, .controle textarea {
        width: 30%;
        margin-left: 15px;
        font-size: inherit;
        border-radius: 15px;
        padding: 10px;
    }

    .container{
        display: block;
        text-align: center;        
    }


</style>