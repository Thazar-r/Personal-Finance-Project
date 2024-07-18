# Personal-Finance-Project
This is a simple web application for tracking personal finances. It allows users to add income and expenses, view their transactions, and see a summary of their financial activities.

# Features

- Add income and expenses with categories and dates.
- View all transactions in a list.
- Calculate and display total income, total expenses, and balance.
- Clear all transactions.
- Sort transactions by date.
- Filter transactions by category.

# Technologies Used

- HTML
- CSS
- JavaScript
- JSON Server

 How to Use

1. Fork and Clone the repository:
   copy the ssh key and head over to your terminal
   git clone <git@github.com:Thazar-r/Personal-Finance-Project.git>
   

2. Navigate to the project directory:

   bash
   cd personal-finance-tracker
   

3. Install JSON Server globally (if not already installed):

   bash
   npm install -g json-server
   

4. Start JSON Server with db.json:

   bash
   json-server --watch db.json --port 3000
   

5. Open index.html in your web browser.

Use the form to add transactions. Transactions will be stored in db.json and updated dynamically on the web page.

You can clear transactions, sort them by date, and filter them by category using the buttons provided.

# Author

[Melchior Balthazar]

# License

This project is licensed under the MIT License - see the LICENSE file for details.

# Instructions

1. Setup: Clone the repository and navigate into the project directory.

2. Install JSON Server: If you haven't installed JSON Server globally, use npm install -g json-server.

3. Start JSON Server: Run json-server --watch db.json --port 3000 to start serving db.json.

4. Open Application: Open index.html in your web browser to use the Personal Finance Tracker.

5. Usage: Add transactions, clear transactions, sort by date, or filter by category using the provided functionalities.