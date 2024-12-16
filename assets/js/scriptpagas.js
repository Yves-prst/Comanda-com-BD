document.addEventListener('DOMContentLoaded', () => {
    let comandasPagas = JSON.parse(localStorage.getItem('comandasPagas')) || []
    const totalComandasDiv = document.getElementById('total-comandas')
    const comandasPagasDiv = document.getElementById('comandas-pagas')
    let totalComandas = 0
    let htmlContent = ''

    const contarProdutosRepetidos = (comanda) => {
        const contagem = {}

        comanda.items.forEach(item => {
            contagem[item] = (contagem[item] || 0) + 1
        })

        console.group(`Comanda: ${comanda.title}`)
        console.log('Itens:')
        for (const produto in contagem) {
            console.log(` ${contagem[produto]}x ${produto}`)
        }
        console.log('Total:', comanda.total)
        console.groupEnd()
    }

    if (comandasPagas.length > 0) {
        console.group('Comandas Pagas')
        comandasPagas.forEach((comanda, index) => {

            contarProdutosRepetidos(comanda)

            htmlContent += `<div class="comanda-info" data-index="${index}">`
            htmlContent += `<span class="delete-btn" onclick="deleteComanda(${index})">&times</span> <br>`
            htmlContent += `<h3>${comanda.title}</h3>`

            htmlContent += `<ul>`
            comanda.items.forEach(item => {
                htmlContent += `<li>${item}</li>`
            })
            htmlContent += `</ul>`

            htmlContent += `<hr>`
            htmlContent += `<br>`
            htmlContent += `<p>${comanda.total}</p>`

            const totalValueString = comanda.total.replace('Total: ', '').replace('R$', '').replace(',', '.')
            const totalValue = parseFloat(totalValueString)
            if (!isNaN(totalValue)) {
                totalComandas += totalValue
            } else {
                console.warn(`Valor total inválido encontrado: ${comanda.total}`)
            }

            htmlContent += `</div>`
        })

        console.groupEnd()
        comandasPagasDiv.innerHTML = htmlContent
        totalComandasDiv.innerHTML = `Soma Total de Todas as Comandas: R$${totalComandas.toFixed(2)}`
        console.log(`Soma total de todas as comandas R$${totalComandas.toFixed(2)}`)
        
    } else {
        console.log('Nenhuma comanda paga encontrada.')
        totalComandasDiv.innerHTML += 'Nenhuma comanda paga encontrada.'
    }

    document.getElementById('bt').addEventListener('click', () => salvarComandas())
    
})

function salvarComandas() {
    let comandasPagas = JSON.parse(localStorage.getItem('comandasPagas')) || []

    if (comandasPagas.length === 0) {
        alert('Nenhuma comanda para salvar.')
        return
    }

    fetch('salvar_comandas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comandasPagas)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Dados enviados para o banco com sucesso!')
                console.log('Dados enviados para o banco com sucesso:', data)

               
                localStorage.removeItem('comandasPagas')
                document.getElementById('comandas-pagas').innerHTML = ''
                document.getElementById('total-comandas').innerHTML = ''
                comandasPagas = [] 
            } else {
                alert('Erro ao enviar dados para o banco.')
                console.error('Erro no envio:', data.message)
            }
        })
        .catch(error => {
            alert('Erro ao enviar os dados para o banco.')
            console.error('Erro ao enviar os dados para o banco:', error)
        })
       
}

function deleteComanda(index) {
    const comandasPagas = JSON.parse(localStorage.getItem('comandasPagas')) || []
    comandasPagas.splice(index, 1)
    localStorage.setItem('comandasPagas', JSON.stringify(comandasPagas))
    location.reload()
}