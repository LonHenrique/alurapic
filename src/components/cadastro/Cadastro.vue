<template>
    
    <div class="container">
        <h1 v-if="foto._id" class="centralizado">Alterando {{ foto.titulo }}</h1>
        <h1 v-else class="centralizado">Cadastrando</h1>        

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
                <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
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
import FotoService from '../../domain/foto/FotoService'


    export default {

        components: {

        'imagem-responsiva': ImagemResponsiva,
        'meu-botao': Botao
            
        },

        data() {
            return {

                foto: new Foto(),

                id: this.$route.params.id
            }
        },       

       methods: {

        grava() {

            this.service
                .cadastra(this.foto)
                .then(() => {
                    if(this.id) this.$router.push({ name: 'home' });
                        this.foto = new Foto()}
                , err => console.log(err));

            }
        }, 

        created() {

            this.service = new FotoService(this.$resource);

            if(this.id){
                this.service
                    .busca(this.id)
                    .then(foto => this.foto = foto);

            }
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