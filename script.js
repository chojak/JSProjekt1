var productList = [
    {
        name: "Chleb",
        amount: 5,
        price: 2.5,
    },
    {
        name: "Denaturat",
        amount: 1,
        price: 5.3,
    },
    {
        name: "Stern",
        amount: 3,
        price: 2.99,
    },
]
var draggedElement;

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
        productList[element.currentTarget.parentElement.id].name = element.currentTarget.innerHTML;
    });
    
    td3.innerHTML = ilosc;
    td3.contentEditable = lp != 'totalSum' ? true : false;
    td3.addEventListener('blur', (element) => {
        if(element.currentTarget.innerHTML <= 0) {
            alert('Niepoprawna wartość: ilość')
        }
        else {
            productList[element.currentTarget.parentElement.id].amount = element.currentTarget.innerHTML;
            printList()
        }
    })
    
    td4.innerHTML = cena;
    td4.contentEditable = lp != 'totalSum' ? true : false;
    td4.addEventListener('blur', (element) => {
        if((element.currentTarget.innerHTML * 100) %1 != 0) {
            console.log(element.currentTarget.innerHTML)
            alert("Cena może mieć maksymalnie 2 liczby po przecinku")
        }
        else {
            productList[element.currentTarget.parentElement.id].price = element.currentTarget.innerHTML;
            printList()
        }
    })

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
    tr.appendChild(deleteButton)

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

    printRow('totalSum', '', '', 'RAZEM', totalSum.toFixed(2))
}

function addProduct() {
    let name = document.getElementById('productNameInput').value
    let amount = document.getElementById('productAmountInput').value
    let price = document.getElementById('productPriceInput').value
    
    if(name === '') {
        alert("Nazwa nie może być pusta")
        return
    }
    if(amount <= 0) {
        alert("Niepoprawna wartość: ilość")
        return
    }
    if((price * 100) %1 != 0 ) { 
        alert("Cena może mieć maksymalnie 2 liczby po przecinku")
        return
    }

    productList.push({
        name: name,
        amount: amount,
        price: Number(price).toFixed(2),
    })
    printList();
}

printHeaderList('LP', 'NAZWA', 'ILOŚĆ', 'CENA', 'SUMA');
printList();