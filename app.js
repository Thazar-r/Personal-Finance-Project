document.addEventListener('DOMContentLoaded', function() {
    const transactionsList = document.getElementById('transactions-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const balance = document.getElementById('balance');
    const addTransactionForm = document.getElementById('add-transaction-form');
    const buttonsContainer = document.getElementById('buttons-container');

    let transactions = [];

    // Fetch transactions from db.json
    fetch('http://localhost:3000/transactions')
        .then(response => response.json())
        .then(data => {
            transactions = data.transactions; // Assuming your data is structured like { "transactions": [] }
            updateUI();
        })
        .catch(error => console.error('Error fetching transactions:', error));

    // Function to update the UI
    function updateUI() {
        transactionsList.innerHTML = '';
        let income = 0;
        let expenses = 0;

        transactions.forEach(transaction => {
            const transactionElement = document.createElement('div');
            transactionElement.classList.add('transaction');
            transactionElement.innerHTML = `
                <span>${transaction.description} - ${transaction.date}</span>
                <span>${transaction.amount.toFixed(2)}</span>
            `;

            transactionsList.appendChild(transactionElement);

            if (transaction.amount > 0) {
                income += transaction.amount;
            } else {
                expenses += Math.abs(transaction.amount);
            }
        });

        totalIncome.textContent = income.toFixed(2);
        totalExpenses.textContent = expenses.toFixed(2);
        balance.textContent = (income - expenses).toFixed(2);
    }

    // Function to add a transaction
    addTransactionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        if (description && !isNaN(amount) && date) {
            const newTransaction = {
                description,
                amount,
                date
            };

            fetch('http://localhost:3000/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTransaction)
            })
            .then(response => response.json())
            .then(data => {
                transactions.push(data);
                updateUI();
                addTransactionForm.reset();
            })
            .catch(error => console.error('Error adding transaction:', error));
        }
    });

    // Function to handle button clicks (clear, sort, filter)
    buttonsContainer.addEventListener('click', (e) => {
        if (e.target.id === 'clear-transactions') {
            fetch('http://localhost:3000/transactions', {
                method: 'DELETE'
            })
            .then(() => {
                transactions = [];
                updateUI();
            })
            .catch(error => console.error('Error clearing transactions:', error));
        } else if (e.target.id === 'sort-transactions') {
            transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
            updateUI();
        } else if (e.target.id === 'filter-transactions') {
            const category = prompt('Enter category to filter:');
            if (category) {
                const filteredTransactions = transactions.filter(transaction => transaction.category.toLowerCase() === category.toLowerCase());
                transactionsList.innerHTML = '';
                filteredTransactions.forEach(transaction => {
                    const transactionElement = document.createElement('div');
                    transactionElement.classList.add('transaction');
                    transactionElement.innerHTML = `
                        <span>${transaction.description} - ${transaction.date}</span>
                        <span>${transaction.amount.toFixed(2)}</span>
                    `;
                    transactionsList.appendChild(transactionElement);
                });

                const filteredIncome = filteredTransactions.reduce((acc, curr) => curr.amount > 0 ? acc + curr.amount : acc, 0);
                const filteredExpenses = filteredTransactions.reduce((acc, curr) => curr.amount < 0 ? acc + curr.amount : acc, 0);
                totalIncome.textContent = filteredIncome.toFixed(2);
                totalExpenses.textContent = filteredExpenses.toFixed(2);
                balance.textContent = (filteredIncome - filteredExpenses).toFixed(2);
            }
        }
    });
});
