(function(){

    "use script"

    // const mask = {
    //     cep (value){
    //         return value
    //                 .replace(/\D/g, '')
    //                 .replace(/(\d{5})(\d)/,'$1-$2')
    //                 .replace(/(-\d{3})\d+?$/, '$1')
    //     }
    // }

    function cep(value){
        return value
                .replace(/\D/g, '')
                .replace(/(\d{5})(\d)/,'$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')
    }

    $cep = document.querySelector('[data-js="cep"]')

    $cep.addEventListener('input', (e) =>{
        e.target.value = cep(e.target.value)
    }, false)

    $cep.addEventListener("blur", e =>{
        let search = $cep.value.replace("-","")
        
        const options = {
            method :'GET',
            mode:'cors',
            cache:'default'
        }

        fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then( response => { response.json()
            .then(data => showData(data)) 
        })
        .catch(erro => console.log('Erro: ' + erro.message))
    })

    const showData = result => {
        for(const campo in result){
            if(document.querySelector(`[data-js="${campo}"]`))
                document.querySelector(`[data-js="${campo}"]`).value = result[campo]
        }
    }



    // document.querySelectorAll('input').forEach(($input) => {
    //     const field = $input.dataset.js

    //     $input.addEventListener('input', (e) => {
    //         // e.target.value = mask[field](e.target.value)
    //         e.target.value = cep(e.target.value)
    //     }, false)

    // }, false)

})()