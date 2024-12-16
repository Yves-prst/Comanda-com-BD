const productsData = {
    1: { name: "Tapioca de Calabresa", price: 10.50 },
    2: { name: "Tapioca de Carne Bovina Gourmet", price: 13.50 },
    3: { name: "Tapioca Especial", price: 13.50 },
    4: { name: "Tapioca de Frango", price: 9.50 },
    5: { name: "Tapioca de Frango c/ Catupiry", price:11.50},
    6: { name: "Tapioca de Frango c/ Cheddar", price:11.50}, 
    7: { name: "Tapioca de Frango c/ Batata Doce", price:10.50}, 
    8: { name: "Tapioca de Pizza", price:10},
    9: { name: "Tapiproteica", price:15.50},
    10: { name: "Tapiegg", price:9.50},
    11: { name: "Tapifitness", price:10.50},
    12: { name: "Tapioca de Banana c/ Canela", price:9},
    13: { name: "Tapioca de Banana Fitness", price:15}, 
    14: { name: "Tapioca de Banana ao Mel", price:10},
    15: { name: "Tapioca de Banana Gourmet", price:10.50},
    16: { name: "Tapioca de Coco", price:10.50},
    17: { name: "Tapioca da Casa", price:13.50},
    18: { name: "Tapioca de Morango", price:10.50},
    19: { name: "Tapioca Julieta e Catupiry", price:10},
    20: { name: "Tapioca de Prestígio",  price:13.50},
    21: { name: "Tapioca Romeu e Julieta", price:9.50},
    22: { name: "Copo 400ml", price:6},   
    23: { name: "Copo 500ml" ,price:7},    
    24: { name: "Garrafa 500ml", price:9},   
    25: { name: "Garrafa 1l", price:15},  
    26: { name: "Garrafa 2l", price:25},
    27: { name: "Natural", price:0},
    28: { name: "Limão", price:0},
    29: { name: "Abacaxi", price:0},
    30: { name: "Gengibre", price:0},
    31: { name: "Maracujá", price:0},      
    32: { name: "Limão, Abacaxi, Gengibre, Maracujá", price:0},
    33: { name: "Coco Verde Gelado", price:10}, 
    34: { name: "Garrafa Coco", price:12},   
    35: { name: "Água Garrafa", price:3},  
    36: { name: "Refrigerante lata", price:5},    
    37: { name: "Café Espresso Supremo Puro ou c/ Leite", price:5},    
    38: { name: "Café Melitta Filtrado Puro ou c/ Leite", price:5},    
    39: { name: "Chá Mate Quente Natural ou Sabores", price:4},      
    40: { name: "Chocolatto Espresso Levemente Adocicado", price:8},
    41: { name: "Chocolate Nestlé 100% Cacau", price:8},
    42: { name: "Achocolatado Nescau", price:5},
    43: { name: "Geladinho de Abacate", price:3.50},   
    44: { name: "Geladinho de Coco", price:3.50},   
    45: { name: "Geladinho de Chocolate", price:3.50},   
    46: { name: "Geladinho de Maracujá", price:3.50}, 
    47: { name: "Geladinho de Melancia", price:3.50},    
    48: { name: "Geladinho de Morango", price:3.50},    
    49: { name: "Geladinho de Paçoca", price:3.50},   
    50: { name: "Amendoim Doce Cricri", price:5},    
    51: { name: "Amendoim Salgado na Manteiga", price:5},    
    52: { name: "+ Cheddar", price:3},    
    53: { name: "+ Catupiry", price:3},
    54: { name: "+ Muçarela", price:3},     
    55: { name: "+ Carne Bovina", price:3},   
    56: { name: "+ Ovo", price:3},   
    57: { name: "+ Morango", price:3},     
    58: { name: "+ Chocolate", price:3},     
    59: { name: "+ Coco", price:3},  
    60: { name: "+ Leite Condensado", price:3},   
    61: { name: "+ Goiabada", price:3},   
    62: { name: "+ Tomate", price:3},    
    63: { name: "+ Banana", price:3},   
    64: { name: "+ Mel", price:3},    
    65: { name: "+ Frango" ,price:3},   
    66: { name: "+ Canela", price:0},   
    67: { name: "Sem Cebola", price:0},    
    68: { name: "Sem Tomate" , price:0},  
    69: { name: "Sem orégano", price:0},   
    70: { name: "Sem orapronóbis", price:0},  
    71: { name: "Sem Gelo", price:0},
    72: { name: "Para Viagem", price:0}
}

let currentComanda = []

function addProduct() {
    const code = parseInt(document.getElementById('productCode').value)

    if (productsData[code]) {
        const product = {
            code: code,
            name: productsData[code].name,
            price: productsData[code].price,
        }

        currentComanda.push(product)

        const txt = document.querySelector('div#adicionado')
        txt.innerHTML += `<div class="Adi" style="display: flex; justify-content: space-between; align-items: center;">
                            <span>${product.name} - R$${product.price.toFixed(2)}</span>
                            <button id="buttonAdd1" onclick="deleteLinha(this)" style="margin-left: auto;"><i class="fas fa-x"></i></button>
                          </div>`

        document.getElementById('productCode').value = ''
        document.querySelector('.cdg').value = ''
    } else {
        alert('Código de produto inválido.')
    }
}

function deleteLinha(button) {

    const div = button.closest('div')

    div.remove()

    const itemName = div.textContent.split(' - ')[0].trim()
    currentComanda = currentComanda.filter(item => item.name !== itemName)
}


let numeroComanda = 1
let comandaEditadaNumero = null 

function editarComanda(icon) {
    const comandaDiv = icon.closest('.itens')
    const comandaTitle = comandaDiv.querySelector('h2').textContent

    comandaEditadaNumero = parseInt(comandaTitle.split(' ')[1]) 

    const products = comandaDiv.querySelectorAll('ul li')

    currentComanda = []

    products.forEach(item => {
        const itemName = item.textContent.split(' - ')[0].trim()
        const itemPrice = parseFloat(item.textContent.split(' - ')[1].replace('R$', '').trim())
        const code = Object.keys(productsData).find(key => productsData[key].name === itemName)

        if (code) {
            currentComanda.push({
                code: parseInt(code),
                name: itemName,
                price: itemPrice
            })
        }
    })

    comandaDiv.innerHTML = ''

    const txt = document.querySelector('div#adicionado')
    txt.innerHTML = ''

    currentComanda.forEach(product => {
        txt.innerHTML += `<div class="Adi" style="display: flex; justify-content: space-between; align-items: center;">
                            <span>${product.name} - R$${product.price.toFixed(2)}</span>
                            <button id="buttonAdd1" onclick="deleteLinha(this)" style="margin-left: auto;"><i class="fas fa-x"></i></button>
                          </div>`
    })
}

function confirmComanda() {
    let total = 0
    let comandaContent = `<div class="menuIcons">
                                <i id="icone" class="fas fa-print" onclick="window.print()" style="cursor: pointer; margin-right: auto; margin-left: auto;"></i>
                                <i id="icone" class="fas fa-edit" onclick="editarComanda(this)" style="cursor: pointer; margin-right: auto;"></i> 
                                <i id="icone" class="fas fa-trash" onclick="deletarComanda(this)" style="cursor: pointer; margin-right: auto;"></i> 
                                <i class="fas fa-check" onclick="comandaPaga(this)" style="cursor: pointer; margin-right: auto;"></i> 
                            </div>
        <br>`

    if (comandaEditadaNumero !== null) {
        comandaContent += `<h2>Comanda ${comandaEditadaNumero}</h2><ul><br>`
        comandaEditadaNumero = null 
    } else {
        comandaContent += `<h2>Comanda ${numeroComanda}</h2><ul><br>`
        numeroComanda++
    }

    currentComanda.forEach(product => {
        comandaContent += `<li>${product.name} - R$${product.price.toFixed(2)} </li><br>`
        total += product.price
    })

    comandaContent += `<br><hr><br></ul><p>Total: R$${total.toFixed(2)}</p>`

    const comandaDivs = document.querySelectorAll('.itens')
    let comandaDiv = Array.from(comandaDivs).find(div => !div.innerHTML)

    if (!comandaDiv) {
        if (currentComanda.length > 0) {
            comandaDiv = document.createElement('div')
            comandaDiv.classList.add('itens')
            document.querySelector('.comandas').appendChild(comandaDiv)
        } else {
            alert('Comanda vazia')
        }   
    }

    comandaDiv.innerHTML = comandaContent
    currentComanda = []

    var text = document.querySelector('div#adicionado') 
    text.innerHTML= ''
}

function deletarComanda(icon) {
    if (confirm('Você tem certeza que deseja excluir esta comanda?')) {
        const comandaDiv = icon.closest('.itens')
        comandaDiv.remove()
    }
}

function comandaPaga(icon) {
    const comandaDiv = icon.closest('.itens')
    const comandaTitle = comandaDiv.querySelector('h2').textContent
    const comandaListItems = comandaDiv.querySelectorAll('ul li')
     const comandaTotal = comandaDiv.querySelector('p').textContent

    const comanda = {
        title: comandaTitle,
        items: Array.from(comandaListItems).map(item => item.textContent),
        total: comandaTotal
    }

    let comandasPagas = JSON.parse(localStorage.getItem('comandasPagas')) || []
    comandasPagas.push(comanda)
    localStorage.setItem('comandasPagas', JSON.stringify(comandasPagas))
            
    comandaDiv.remove()

    console.group(`Comanda: ${comandaTitle}`)
    console.log('Itens:')
    comandaListItems.forEach(item => {
    console.log(item.textContent)
    })
    console.log(comandaTotal)
    console.groupEnd()
}



function getItemPrice(itemName) {
    const product = Object.values(productsData).find(product => product.name === itemName)
    return product ? product.price : 0
}


function getProductRelevance(query, productName) {
    const queryLower = query.toLowerCase()
    const productLower = productName.toLowerCase()
    let relevance = 0
    let index = productLower.indexOf(queryLower)

    while (index !== -1) {
        relevance++
        index = productLower.indexOf(queryLower, index + 1)
    }

    return relevance
}

function filterOptions() {
    
    const input = document.getElementById('productCode')
    const filter = input.value;
    const autocompleteList = document.getElementById("autocomplete-list")
    
    autocompleteList.innerHTML = ""
    
    if (filter) {
        
        const filteredOptions = Object.entries(productsData)
            .map(([code, { name, price }]) => ({ 
                code, 
                name, 
                price, 
                relevance: getProductRelevance(filter, name) 
            }))
            .filter(product => product.relevance > 0)
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 10);
        
        filteredOptions.forEach(({ name, code }, index) => {
            
            const item = document.createElement("div")
            item.textContent = name
            
        
            if (index % 2 === 0) {
                item.style.backgroundColor = "#ffffff"
            } else {
                item.style.backgroundColor = "#f0f0f0"
            }
            
            item.style.cursor = "pointer"
            item.style.padding = "5px"
            
            item.onclick = function () {
                input.value = name;
                autocompleteList.innerHTML = ""
                document.getElementById("productCode").value = code;
            }
            
            autocompleteList.appendChild(item)
        })
    }
}