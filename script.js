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
}

function printList() {
    productList.forEach((element, index) => {
        printRow(index + 1, element.name, element.amount, element.price, (element.amount * element.price))
    });
}

printHeaderList('LP', 'NAZWA', 'ILOSC', 'CENA', 'SUMA');
printList();