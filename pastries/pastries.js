// Function to update the item quantity
function updateItemQuantity(button, change) {
    const pastriesCard = button.closest('.pastries-card');
    const priceElement = pastriesCard.querySelector('.price');
    const numberOfItemElement = pastriesCard.querySelector('.number-of-item');
    
    //spliting priceText string into array od substrings using ":" as separator, this results in: ["Price","100"] array then choosing [1]=>100, trim remove whitespaces from selected substring i.e. the Price: 100 has a space just after : so trim removes that then parseInt converts "100" to 100.
    const priceText = priceElement.textContent;
    const price = parseInt(priceText.split(".")[1].trim());
    let numberOfItem = parseInt(numberOfItemElement.textContent);
    
    if (change > 0 || (change < 0 && numberOfItem > 0)) {
        numberOfItem += change;
        numberOfItemElement.textContent = numberOfItem;
        updateTotalPrice(change * price);
    }
}

// Function to update the total price
function updateTotalPrice(change) {
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = parseInt(totalPriceElement.textContent);
    totalPrice += change;
    totalPriceElement.textContent = totalPrice;
}