const axios = require("axios");

async function getLatestPrice(symbol) {
    try {
        const response = await axios.get(
            `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR`
        );
        const data = response.data;
        // return data["Global Quote"]["05. price"];
        return data;
    } catch (error) {
        console.error(error);
    }

}

// Example usage:
getLatestPrice("AAPL").then((price) => console.log(price));

// function getUSDValues() {
//     var cryptoURL =
//         "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=3789ea397be622354552b3ab2a826e4379b5da952de997d3cff964ed4f0786ee";

//     var options = {
//         url: cryptoURL,
//         headers: {
//             "User-Agent": "request",
//         },
//     };
//     // Return new promise
//     return new Promise(function(resolve, reject) {
//         // Do async job
//         request.get(options, function(err, resp, body) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(JSON.parse(body));
//             }
//         });
//     });
// }