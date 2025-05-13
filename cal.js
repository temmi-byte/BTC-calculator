let display = document.getElementById("display");
let btcRate = 0; // This will be updated with live data

// Fetch BTC price from CoinGecko
async function fetchBTCRate() {
    try {
        let response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        let data = await response.json();
        btcRate = data.bitcoin.usd;
        console.log("BTC Price Updated: $" + btcRate);
    } catch (error) {
        console.error("Error fetching BTC price", error);
        btcRate = 60000; // Default fallback price
    }
}

// Call fetch function when page loads
fetchBTCRate();

// Update BTC price every 30 seconds
setInterval(fetchBTCRate, 30000);

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function convertBTCtoUSD() {
    let btc = parseFloat(display.value);
    if (!isNaN(btc)) {
        display.value = (btc * btcRate).toFixed(2) + " USD";
    } else {
        display.value = "Invalid BTC";
    }
}

function convertUSDtoBTC() {
    let usd = parseFloat(display.value);
    if (!isNaN(usd)) {
        display.value = (usd / btcRate).toFixed(8) + " BTC";
    } else {
        display.value = "Invalid USD";
    }
}
