// fields: get UI elements
let budgetOutput = document.querySelector(".budget-output");
let totalExpense = document.querySelector(".total-expenses-output");
let balance = document.querySelector(".balance-output");
let categoryExpense = document.querySelector(".category-expense-input");
let nameExpense = document.querySelector(".name-exense-input");
let amountExpense = document.querySelector(".amount-expense-input");
let tableExpense = document.querySelector(".expense-items-table");
let calcBtn = document.getElementById("calculate-btn");
let addBtn = document.getElementById("add-btn");
let avgCost = document.getElementById("avg-cost");
let budgetInput = document.getElementById("user-budget");
let image = document.getElementById("face-img");

//variable use locally
let netResult = 0;
let subtotal = 0; //variable to track subtotal of 1 category
let isVisible = false; //variable for image



function calculateBalance() {
    //validate input
    let budget = parseInt(budgetInput.value);
    if (budget < 0) {
        window.alert("Starting amount must be a positive number");
        return;
    }
    //get the total expense
    let expense = calculateTotalExpenses();
    if (budget >= 0) {
        netResult = budget - expense;
    } else { //use the added budget or default budget "0"
        budget = budgetOutput.firstChild.nodeValue;
        netResult = budget - expense;
    }
    updateUI(budget, expense, netResult);
}

function calculateTotalExpenses() {

    let total = 0;
    let expenselist = document.querySelectorAll(".expense-item");
    for (let i = 0; i < expenselist.length; i++) {
        total += parseInt(expenselist[i].innerHTML);
    }
    return total;
}

function addExpenseItem() {
    //validate input expense item
    if (categoryExpense.value == "") {
        window.alert("Category field is required to add new Item");
        return;
    }
    if (nameExpense.value == "") {
        window.alert("Name field is required to add new Item");
        return;
    }
    if (amountExpense.value == "") {
        window.alert("Expenses amount is required to add new Item");
        return;
    } else if (amountExpense.value < 0) {
        window.alert("Expenses amount must be a positive number");
        return;
    }

    let rowToInsert = 0; //by default insert place is first row
    let found = false;
    let subcell;

    //check if the category exist in the list
    //then insert to that row instead of create new Row
    for (let row = 0; row < tableExpense.rows.length; row++) {
        if (categoryExpense.value == tableExpense.rows[row].cells[0].innerHTML
            && tableExpense.rows[row].cells[0].className == "category-heading") {
            rowToInsert = row
            found = true
        }
    }

    // insert new items into new category or the exist category
    // as well as calculate Subtotal expense for the category
    if (rowToInsert == 0 && found == false) { //new category
        //reset subtotal for the new category
        subtotal = parseInt(amountExpense.value);

        let row1 = tableExpense.insertRow(rowToInsert);
        let cell1 = row1.insertCell(0); //category
        let cell2 = row1.insertCell(1); //price
        subcell = row1.insertCell(2); //subtotal

        cell1.innerHTML = categoryExpense.value;
        cell1.setAttribute("class", "category-heading")
        cell2.innerHTML = "Price";
        cell2.setAttribute("class", "category-heading")
        subcell.innerHTML = "Subtotal: $" + subtotal;
        subcell.setAttribute("class", "category-heading")

        let row2 = tableExpense.insertRow(rowToInsert + 1); //item
        let cell3 = row2.insertCell(0);
        let cell4 = row2.insertCell(1);
        cell3.innerHTML = nameExpense.value;
        cell4.innerHTML = amountExpense.value;
        cell4.setAttribute("class", "expense-item")
    } else { //insert to the exist category
        subcell = tableExpense.rows[rowToInsert].cells[2] //subtotal cell
        let row2 = tableExpense.insertRow(rowToInsert + 1); //item
        let cell3 = row2.insertCell(0);
        let cell4 = row2.insertCell(1);
        cell3.innerHTML = nameExpense.value;
        cell4.innerHTML = amountExpense.value;
        cell4.setAttribute("class", "expense-item");

        //update subtotal with new item price
        subtotal += parseInt(amountExpense.value)
        subcell.innerHTML = "Subtotal: $" + subtotal;
    }

    //calculate balance for new item added
    calculateBalance();
    calculateAvgCost();
}

//function to calculate average cost per items
function calculateAvgCost() {
    let expenselist = document.querySelectorAll(".expense-item");
    let totalItems = expenselist.length;
    let avg = 0;
    avg = calculateTotalExpenses() / totalItems;

    //show average cost to screen
    avgCost.innerHTML = avg;
}



function updateUI(newBudget, newTotalexpense, newBalance) {
    budgetOutput.firstChild.nodeValue = newBudget
    totalExpense.firstChild.nodeValue = newTotalexpense
    balance.firstChild.nodeValue = newBalance

    if (newBalance > 0) {
        this.showImg();
        image.src = "photos/success-face.png"
    } else if (newBalance < 0) {
        this.showImg()
        image.src = "photos/sad-face.png"
    }
}

//show image
function showImg() {
    if (isVisible == false) {
        isVisible = true;
        image.classList.remove("hide-item")
    }
}

//hide image
function hideImg() {
    if(isVisible == true){
        isVisible = false;
        image.classList.add("hide-item")
    }
}

// hide the image after 5s
setInterval(() => {
    hideImg();
}, 5000);