const form = document.getElementById('form-despesas')
let listaDespesas = document.getElementById('lista-despesas')
let totalDespesas = document.getElementById('total-despesas')

let despesas = []

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const categoria = document.getElementById('categoria').value
    const valor = document.getElementById('valor').value

    if(descricao && categoria && valor > 0){
        const despesa = {descricao, categoria, valor}
        despesas.push(despesa)
        console.log(despesas)
        atualizarLista()
        calcularDespesas()
        form.reset()
    }else{
        alert('Por favor, preencha todo os campos corretamente!')
    }

    function atualizarLista(){
        listaDespesas = ''
        despesas.forEach((despesa, index)=>{
            const tr = document.createElement('tr')

            tr.innerHTML =`
                <td>${despesa.descricao}</td>
                <td>${despesa.categoria}</td>
                <td>${despesa.valor}</td>
                <td><button class="btn-acao" onclick="removerDespesas(${index})" >Remover</button></td>
            `
        })
    }

    function calcularDespesas(){
        const total = despesas.reduce((acumulador, despesa)=> acumulador + despesa, 0)
        totalDespesas = total
    }

})
tr.style.display = 'none'