<template>
    <button @click="disparaAcao()" class="padrao" :class="estiloDoBotao" :type="tipo">{{ rotulo }}</button>
</template>

<script>
    export default {
        // Validação de propriedades 
        props: {

            tipo: {
                required: true,
                type: String
            },

            rotulo: {
                required: true,
                type: String
            },

            confirmacao: Boolean,

            estilo: String
                        
        },

        methods:{

            disparaAcao (){

                if(this.confirmacao) {

                    if(confirm('Confirma operação')) {
                        this.$emit('botaoAtivado');
                    }
                return;            
                }
                this.$emit('botaoAtivado');
            }
        },
        
        computed: {
            
            estiloDoBotao() {
                
                if(this.estilo == 'padrao' || !this.estilo) return 'botao botao-padrao'
                if(this.estilo == 'perigo') return 'botao botao-perigo'
                
            }
        }
    }
    
</script>

<style scoped>
    .botao {
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
        margin: 10px;
        font-size: 1.2em;
        border: none;
    }

    .botao-perigo {
        background: firebrick;
        color: white;
    }

    .botao-perigo:hover{
        background-color: rgb(92, 5, 5);
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }

    .botao-padrao:hover{
        background-color: rgb(1, 78, 78);
    }

</style>>

