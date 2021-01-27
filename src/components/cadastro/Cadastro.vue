<template>
    
    <div class="container">
        <h1 v-if="foto._id" class="centralizado">Alterando {{ foto.titulo }}</h1>
        <h1 v-else class="centralizado">Cadastrando</h1>        

        <form @submit.prevent="grava()">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="controle">                
                    <label for="titulo" id="input">TÍTULO</label>
                    <input v-model="foto.titulo" id="titulo" name="titulo" type="text" autocomplete="off" placeholder="Titulo da série"> 
                    <span>{{ errors[0] }}</span>                                       
                </div>
            </ValidationProvider>

            <div class="controle">
                <label for="titulo" id="input">URL</label>
                <input id="url" autocomplete="off" v-model="foto.url">

            </div>

            <div class="controle">
                <ValidationProvider rules="minmax:0,50" v-slot="{ errors }">
                    <label for="titulo" id="input">DESCRIÇÃO</label>
                    <textarea v-model="foto.descricao" id="descricao" name="descricao" autocomplete="off" placeholder="Descrição da série"></textarea>
                    <span>{{ errors[0] }}</span>
                    <span>{{ foto.descricao.length}}</span>
                </ValidationProvider>
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
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';


extend('minmax', {
    validate(foto, { min, max }){
        return foto.length >= min && foto.length <= max;        
    },    
    params: ['min','max'],
    message: (fieldName, placeholders) => {
        return `O campo, ${fieldName} deve ter pelo menos ${placeholders.max} caracteres no máximo`
    }
});

extend('required', {
    ...required,
    message:"campo obrigatório"

});


    export default {

        components: {

        'imagem-responsiva': ImagemResponsiva,
        'meu-botao': Botao,
        'ValidationProvider' : ValidationProvider
            
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