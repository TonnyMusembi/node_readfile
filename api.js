const request = require("request");

const apiUrl = "https://api.example.com/data";

request(apiUrl, (error, response, body) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }

    if (response.statusCode !== 200) {
        console.error(`Invalid status code: ${response.statusCode}`);
        return;
    }

    const data = JSON.parse(body);
    // Convert data as needed...
});