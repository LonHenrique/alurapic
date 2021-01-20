<template>
    
    <nav>
        <ul class="bgMenu">       
            <li class="menu" v-for="rota in rotas" :key="rota.id">
                <router-link :to="rota.path ? rota.path : '/' ">{{ rota.titulo }}</router-link>
            </li>          
        </ul>
    </nav>
    
</template>

<script>
    export default {

        props: {
            rotas: {
                type: Array,
                required: true
            }
        }

    }
</script>

<style scoped>
    .menu{
        font-family: 'Poppins', 'Helvetica', sans-serif;        
        display: inline-block;
        list-style-type: none;
        padding: 7px;
        margin-top: 15px;
        font-size: 1.2em;
        
    }
    a:link {
        text-decoration: none;
    }
    a:visited{
        text-decoration: none;
    }
    .bgMenu {
        background-color: darkgray;
        height: 80px;
    }
    
</style>