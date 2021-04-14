class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");

        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.expenseAmount = document.getElementById("expense-amount");
        this.selectedExpenseType = document.querySelector(".selected");


        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");

        this.expenseList = document.querySelector(".styled-table tbody");
        this.itemList = [];
        this.itemID = 1;
    }
    //submit budget method
    submitBudgetForm = () => {
        const value = this.budgetInput.value.trim();
        if (value == '' || value < 0) {
            this.budgetFeedback.classList.add("show-feedback");
            this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
            const self = this;
            setTimeout(() =>
                self.budgetFeedback.classList.remove('show-feedback')
                , 3000);
        } else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }
    showBalance = () => {
        let expense = this.totalExpense();
        let total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if (total < 0) {
            this.balance.classList.remove("showGreen", "showBlack");
            this.balance.classList.add("showRed");
        }
        else if (total > 0) {
            this.balance.classList.remove("showRed", "showBlack");
            this.balance.classList.add("showGreen");
        }
        else if (total === 0) {
            this.balance.classList.remove("showRed", "showGreen");
            this.balance.classList.add("showBlack");
        }
    }
    submitExpenseForm = () => {
        const expenseValue = this.expenseInput.value.trim();
        const expenseType = this.selectedExpenseType.textContent.trim();
        if (expenseValue === '' || expenseValue < 0 || expenseType === "Selected expense category") {
            this.expenseFeedback.classList.add("show-feedback");
            this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
            const self = this;
            setTimeout(() =>
                self.expenseFeedback.classList.remove('show-feedback')
                , 3000);
        } else {
            let amount = parseInt(expenseValue);
            this.expenseInput.value = '';
            const expense = {
                id: this.itemID,
                title: expenseType,
                amount: amount,
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
        }
    }
    addExpense = (expense) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        
                <td>${expense.id}</td>
                <td>${expense.title}</td>
                <td>${expense.amount}</td>
                <td>
                    <span class="edit-icon icon" data-id="${expense.id}"><i class="far fa-edit"></i></span>&nbsp;
                    <span class="delete-icon icon" data-id="${expense.id}"><i class="fas fa-trash"></i></span>
                </td>
       
        `;
        this.expenseList.appendChild(tr);
        this.showBalance();

    }
    totalExpense = () => {
        let total = 0;
        if (this.itemList.length > 0) {
            total = this.itemList.reduce((acc, curr) => {
                acc += curr.amount;
                return acc;
            }, 0)
        }
        this.expenseAmount.textContent = total;
        return total;
    }
    editExpense = (element) => {
        let id = parseInt(element.dataset.id);
        //edit value in expense-section
        let expense = this.itemList.filter(item => item.id === id);
        this.selectedExpenseType.textContent = expense[0].title;
        this.expenseInput.value = expense[0].amount;
        this.deleteExpense(element);
    }
    deleteExpense = (element) => {
        let id = parseInt(element.dataset.id);
        const parent = element.parentElement.parentElement;//<tr>
        //remove from the dom
        this.expenseList.removeChild(parent)
        //remove form the list
        let tempList = this.itemList.filter(item => item.id !== id);
        this.itemList = tempList;
        this.showBalance();
    }
}

function eventListeners() {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.querySelector(".styled-table tbody");
    //new instance of UI class
    const ui = new UI();
    //budget form submit
    budgetForm.addEventListener("submit", event => {
        event.preventDefault();
        ui.submitBudgetForm();
    });
    //expense form submit
    expenseForm.addEventListener("submit", event => {
        event.preventDefault();
        ui.submitExpenseForm();
    });
    expenseList.addEventListener("click", event => {
        if (event.target.parentElement.classList.contains('edit-icon')) {
            ui.editExpense(event.target.parentElement);
        }
        else if (event.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteExpense(event.target.parentElement);

        }
    });
}
document.addEventListener('DOMContentLoaded', () => { eventListeners(); });
