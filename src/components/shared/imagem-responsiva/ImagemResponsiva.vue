<template>
    <img class="imagem-responsiva" :src="url" :alt="titulo">
</template>

<script>

    export default {

        props: ['url', 'titulo']       
        
    }

</script>

<style scoped>
    .imagem-responsiva {        
        width:265px ;
        height: 250px;
        padding: 5px;
    }
</style>