const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter the date (YYYY-MM-DD): ", async(date) => {
    const portfolioValuePerToken = await getPortfolioValuePerToken(date);
    console.log(
        `The portfolio value per token on ${date} is $${portfolioValuePerToken}`
    );
    rl.close();
});

async function getPortfolioValuePerToken(date) {
    const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y&price_change_percentage_last_updated_at=${date}`
    );
    const portfolio = response.data;

    let totalMarketCap = 0;
    for (const coin of portfolio) {
        totalMarketCap += coin.market_cap;
    }
    return totalMarketCap / portfolio.length;
    console.log(portfolio.length);
}