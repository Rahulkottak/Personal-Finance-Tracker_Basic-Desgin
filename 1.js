class Transaction {
    constructor(date, amount, category) {
      this.date = date;
      this.amount = amount;
      this.category = category;
    }
  }
  
  // create an array to store transactions
  let transactions = [];
  
  // define a function to add a transaction
  function addTransaction(date, amount, category) {
    // create a new Transaction object
    let transaction = new Transaction(date, amount, category);
    
    // add the transaction to the transactions array
    transactions.push(transaction);
    
    // update the display (e.g. add the transaction to the table or list)
    let table = document.querySelector('#transactions-table');
    let row = table.insertRow(-1);
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = amount;
    row.insertCell(2).textContent = category;
    
    // add an edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      // get the index of the row
      let index = Array.from(table.rows).indexOf(row) - 1;
      
      // get the current values of the transaction
      let currentTransaction = transactions[index];
      
      // populate the form with the current values
      document.querySelector('#date-input').value = currentTransaction.date;
      document.querySelector('#amount-input').value = currentTransaction.amount;
      document.querySelector('#category-input').value = currentTransaction.category;
      
      // update the form submit handler to edit the transaction instead of adding a new one
      let form = document.querySelector('#add-transaction-form');
      form.removeEventListener('submit', handleFormSubmit);
      form.addEventListener('submit', (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
        
        // get the updated values from the form
        let date = document.querySelector('#date-input').value;
        let amount = parseFloat(document.querySelector('#amount-input').value);
        let category = document.querySelector('#category-input').value;
        
        // edit the transaction
        editTransaction(index, date, amount, category);
        
        // reset the form submit handler to add new transactions again
        form.removeEventListener('submit', handleFormSubmit);
        form.addEventListener('submit', handleFormSubmit);
        
        // reset the form
        event.target.reset();
      });
    });
    row.insertCell(3).appendChild(editButton);
    
    // add a delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // get the index of the row
      let index = Array.from(table.rows).indexOf(row) - 1;
      
      // delete the transaction
      deleteTransaction(index);
    });
    row.insertCell(4).appendChild(deleteButton);
    
    // update the balance display
    updateBalance();
  }
  
  // define a function to edit a transaction
  function editTransaction(index, date, amount, category) {
    // update the transaction at the specified index
    transactions[index].date = date;
    transactions[index].amount = amount;
    transactions[index].category = category;
    
    // update the display (e.g. update the transaction in the table or list)
    let table = document.querySelector('#transactions-table');
    let row = table.rows[index + 1];
    
    // update the balance display
    updateBalance();
  }
  
  // define a function to delete a transaction
  function deleteTransaction(index) {
    // remove the transaction at the specified index
    transactions.splice(index, 1);
    
    // update the display (e.g. remove the transaction from the table or list)
    let table = document.querySelector('#transactions-table');
    table.deleteRow(index + 1);
    
    // update the balance display
    updateBalance();
  }
  
  // define a function to calculate and display the current balance
  function updateBalance() {
    // calculate the current balance by summing the amounts of all transactions
    let balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    
    // update the display (e.g. update the balance text)
    document.querySelector('#balance').textContent = balance;
  }
  
  // handle form submission
  document.querySelector('#add-transaction-form').addEventListener('submit', (event) => {
      // prevent the default form submission behavior
      event.preventDefault();
      
      // get the form data
      let date = document.querySelector('#date-input').value;
      let amount = parseFloat(document.querySelector('#amount-input').value);
      let category = document.querySelector('#category-input').value;
      
      // add the transaction
      addTransaction(date, amount, category);
      
      // reset the form
      event.target.reset();
  });
  