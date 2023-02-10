const fs = require("fs");
const csv = require("fast-csv");

const portfolio = {};

fs.createReadStream("file.csv")
    .pipe(csv.parse({ headers: true }))
    .on("data", (row) => {
        const token = row.Token;
        if (!portfolio[token]) {
            portfolio[token] = 0;
        }

        if (row.transaction_type === "DEPOSIT") {
            portfolio[token] += parseFloat(row.Amount);
        } else {
            portfolio[token] -= parseFloat(row.Amount);
        }
    })
    .on("end", () => {
        console.log(portfolio);
    });