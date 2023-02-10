const fs = require("fs");
const csv = require("csv-parser");
let sum = 0;
const selectedFields = ["name", "age", "email"];

const results = [];
fs.createReadStream("file.csv")
    .pipe(csv())
    .on(
        "data",
        // (row) => {
        //     sum += parseInt(row);
        // }
        (data) => results.push(data)
    )

.on("end", () => {
    console.log("CSV file successfully processed");
    console.log(results);
});