
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); 
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromcurrency").value;
    let toCurrency = document.getElementById("tocurrency").value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    convertCurrency(amount, fromCurrency, toCurrency);
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`; 
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            if (!rate) {
                alert("Currency not available for conversion.");
                return;
            }

            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            alert("Failed to retrieve currency conversion data.");
        });
}
