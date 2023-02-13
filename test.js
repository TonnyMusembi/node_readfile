const fs = require("fs");
const moment = require("moment");
const csv = require("csv-parser");

const filename = "file.csv";

let portfolio = {};

// Load the CSV data into memory
fs.createReadStream(filename)
    .pipe(csv())
    .on("data", (data) => {
        let { timestamp, transaction_type, Token: token, Amount: amount } = data;
        amount = parseFloat(amount);

        // Initialize the token balance if it doesn't exist
        if (!portfolio[token]) {
            portfolio[token] = 0;
        }

        // Update the balance based on the transaction type
        if (transaction_type === "DEPOSIT") {
            portfolio[token] += amount;
        } else if (transaction_type === "WITHDRAWAL") {
            portfolio[token] -= amount;
        }
    })
    .on("end", () => {
        // Read the command line arguments
        let [, , ...args] = process.argv;

        // Determine the desired output based on the arguments
        let date;
        let token;
        if (args.length === 1) {
            date = moment.unix(parseInt(args[0]));
        } else if (args.length === 2) {
            date = moment.unix(parseInt(args[0]));
            token = args[1].toUpperCase();
        } else {
            date = moment();
        }
        // Output the portfolio value
        if (token) {
            console.log(`${token}: $${portfolio[token]}`);
        } else {
            for (let t in portfolio) {
                console.log(`${t}: $${portfolio[t]}`);
            }
        }
    });