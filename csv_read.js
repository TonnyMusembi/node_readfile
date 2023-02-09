const fs = require("fs");
const csv = require("csv-parser");

const results = [];
fs.createReadStream("file.csv")
    .pipe(csv())
    .on(
        "data",
        (data) => results.push(data)
        // console.log(data);
    )
    .on("end", () => {
        // console.log("CSV file successfully processed");
        console.log(results);
    });