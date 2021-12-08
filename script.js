var productList = [];
var draggedElement;

function loadLocalStorage() { 
    if(localStorage.productList) { 
        productList = JSON.parse(localStorage.productList)
        console.log(productList)
    }
}

function printHeaderList(lp, nazwa, ilosc, cena, suma) {
    let div = document.getElementById('productList');
    let table = document.createElement('table');
    table.id = "paragon";
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    
    th1.innerHTML = lp;
    tr.appendChild(th1)
    th2.innerHTML = nazwa;
    tr.appendChild(th2)
    th3.innerHTML = ilosc;
    tr.appendChild(th3)
    th4.innerHTML = cena;
    tr.appendChild(th4)
    th5.innerHTML = suma;
    tr.appendChild(th5)

    table.appendChild(tr);

    div.appendChild(table);
}

function printRow(lp, nazwa, ilosc, cena, suma) { 
    let table = document.getElementById('paragon');
    
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let deleteButton = document.createElement('button');
    
    if(lp != 'totalSum') {
        tr.id = lp - 1;
        td1.innerHTML = lp;
        tr.draggable = true;
        
        tr.addEventListener('dragstart', (element) => {
            draggedElement = element.currentTarget;
        })
        tr.addEventListener('dragover', element => {
            element.preventDefault();
        })
        tr.addEventListener('drop', (element) => {
            let droppedElementId = element.currentTarget.id;
            let tmp = productList[draggedElement.id];
            productList[draggedElement.id] = productList[droppedElementId];
            productList[droppedElementId] = tmp;

            printList();
        })
    }
    else {
        tr.id = 'totalSum';
        td1.innerHTML = '';
    }

    td2.innerHTML = nazwa;
    td2.contentEditable = lp != 'totalSum' ? true : false;
    td2.addEventListener("keyup", (element) => {
        // onchange not working xD
        if(element.currentTarget.innerHTML == '') {
            alert("Niepoprawna wartość: nazwa")
        }
        else {
            productList[element.currentTarget.parentElement.id].name = element.currentTarget.innerHTML;
        }
    });
    
    td3.innerHTML = ilosc;
    td3.contentEditable = lp != 'totalSum' ? true : false;
    if(lp != 'totalSum') {
        td3.addEventListener('mouseout', (element) => {
            let number = 0;
            if(element.currentTarget.innerHTML.split('.').length == 2) { 
                number = Number(element.currentTarget.innerHTML.split('.')[0]) * 100 + Number(element.currentTarget.innerHTML.split('.')[1])
            }
            else if(element.currentTarget.innerHTML.split('.').length == 1) { 
                number = Number(element.currentTarget.innerHTML.split('.'))
            } 
            console.log(number)
            if(Number(element.currentTarget.innerHTML) <= 0 || number%1 != 0 || element.currentTarget.innerHTML.split('.').length > 2) {
                alert('Niepoprawna wartość: ilość')
            }
            else {
                productList[element.currentTarget.parentElement.id].amount = element.currentTarget.innerHTML;
                printList()
            }
        })
    }
    
    td4.innerHTML = cena;
    td4.contentEditable = lp != 'totalSum' ? true : false;
    if(lp != 'totalSum') {
        td4.addEventListener('mouseout', (element) => {
            let number = 0;
            if(element.currentTarget.innerHTML.split('.').length == 2) { 
                number = Number(element.currentTarget.innerHTML.split('.')[0]) * 100 + Number(element.currentTarget.innerHTML.split('.')[1])
            }
            else if(element.currentTarget.innerHTML.split('.').length == 1) { 
                number = Number(element.currentTarget.innerHTML.split('.'))
            } 
            console.log(element.currentTarget.innerHTML.split('.'))
            if(Number(element.currentTarget.innerHTML) <= 0 || number%1 != 0 || element.currentTarget.innerHTML.split('.').length > 2) {
                alert('Niepoprawna wartość: cena')
            }
            else {
                productList[element.currentTarget.parentElement.id].price = element.currentTarget.innerHTML;
                printList()
            }
        })
    }

    td5.innerHTML = suma;
    
    deleteButton.innerHTML = "Usuń"
    deleteButton.addEventListener('click', (element) => { 
        id = element.currentTarget.parentElement.id;
        productList.splice(id, 1);
        
        printList();
    })

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    if(lp != 'totalSum') {
        tr.appendChild(deleteButton)
    }

    table.appendChild(tr);
}

function printList() {
    let table = document.getElementById('paragon')
    let totalSum = 0;


    while(table.childNodes.length > 1){
        table.removeChild(table.lastChild);
    }

    productList.forEach((element, index) => {
        printRow(index + 1, element.name, element.amount, element.price, Number((element.amount * element.price).toFixed(2)))
        totalSum += element.amount * element.price;
    });
    localStorage.productList = JSON.stringify(productList)
    printRow('totalSum', '', '', 'RAZEM', totalSum.toFixed(2))
}

function addProduct() {
    let name = document.getElementById('productNameInput').value
    let amount = document.getElementById('productAmountInput').value
    let price = document.getElementById('productPriceInput').value
    
    if(name === '') {
        alert("Niepoprawna wartość: nazwa")
        return
    }
    if(amount <= 0 || (amount * 100) %1 != 0) {
        alert("Niepoprawna wartość: ilość")
        return
    }
    if(price <= 0 || (price * 100) %1 != 0 ) { 
        alert("Niepoprawna wartość: cena")
        return
    }

    productList.push({
        name: name,
        amount: amount,
        price: Number(price).toFixed(2),
    })
    printList();
}

document.body.onload = loadLocalStorage();
printHeaderList('LP', 'NAZWA', 'ILOŚĆ', 'CENA', 'SUMA');
printList();