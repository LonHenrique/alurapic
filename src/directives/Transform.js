import Vue from 'vue';

Vue.directive('meu-transform', {

    bind(el, binding, vnode) {
        
        let eixo = 0;

        el.addEventListener('dblclick', function(){

            let i = 90;
            let animacao = false;

            if(binding.value){

                i = binding.value.i;
                animacao = binding.value.animacao
            }            

            eixo+=i;
            el.style.transition = 'transform 0.5s';
            
            if(animacao) el.style.transform = `rotate(${eixo}deg)`;
        
        });
    }
});