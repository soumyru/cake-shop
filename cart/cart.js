// window.addEventListener('beforeunload',function(event){
//     localStorage.clear();
// })

//function to update item
function updateItemQuantity(button, change) {
  const itemCard = button.closest(".cake-card") || button.closest('.pastries-card');
  const itemNameElement = itemCard.querySelector("h2"); 
  const itemName = itemNameElement.textContent;
  const priceElement = itemCard.querySelector(".price");
  const priceText = priceElement.textContent;
  const price = parseInt(priceElement.textContent.split(".")[1].trim());

  if (change > 0) {
    updateTotalPrice(price * change);
    addToCart(itemName,price);
  } else if (change < 0) {
    updateTotalPrice(price * change);
    removeFromCart(itemName);
  }
  console.log(itemName + ":" + price);
}

function addItem(button) {
  if (button.textContent === "Add") {
    button.textContent = "Remove";
    updateItemQuantity(button, 1);
  } else {
    button.textContent = "Add";
    updateItemQuantity(button, -1);
  }
}

function addToCart(itemName,price){
    //retrieves the current cart items from the local storage and '|| []' is used to provide an empty array as a default value if there are no cart items stored in the local storage
    let cartItems=JSON.parse(localStorage.getItem("cart")) || []; //JSON.parse converts teh retrieved data which is in JSON format to JS object
    cartItems.push({itemName,price});//adding new objects with properties itemName & price to cartItems array
    localStorage.setItem("cart",JSON.stringify(cartItems)); //converting back ot JSON format
}

function removeFromCart(itemName,price){
    let cartItems=JSON.parse(localStorage.getItem("cart")) || [];
    //filter method is used to iterate over each item in the cartItems array. 
    cartItems=cartItems.filter(item=>item.itemname!==itemName);//For each item, the callback function (item => item.itemname !== itemName) is called. This function checks if the itemname property of the current item is not equal to the itemName parameter passed to the removeFromCart function.
    localStorage.setItem("cart",JSON.stringify(cartItems));
}

function updateTotalPrice(price) {
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = parseInt(totalPriceElement.textContent);
    totalPrice += price;
    totalPriceElement.textContent = totalPrice;
    console.log(totalPrice);
}


//Displaying cart items
document.addEventListener("DOMContentLoaded",function(){
    displayCartItems();
});


function displayCartItems(){
    const cartItems=JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer=document.querySelector(".cart");
    let totalPrice=0;
    cartItems.forEach(item=>{
        const cartItem=createCartItem(item.itemName,item.price);
        cartContainer.appendChild(cartItem);
        totalPrice+=item.price;
    });

    const totalPriceElement=document.getElementById("total-price");
    totalPriceElement.textContent=totalPrice;
}

//Creating added cart item dynamically
function createCartItem(itemName,price) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const itemDetails = document.createElement("div");
  itemDetails.classList.add("item");

  const itemNameElement = document.createElement("h4");
  itemNameElement.textContent = itemName;

  const priceElement = document.createElement("h4");
  priceElement.classList.add("price");
  priceElement.textContent = `Rs. ${price}`;

  // const weightElement=document.createElement("p");
  // weightElement.textContent=weight;

  itemDetails.appendChild(itemNameElement);
  itemDetails.appendChild(priceElement);
  cartItem.appendChild(itemDetails);

  const addSubItem = document.createElement("div");
  addSubItem.classList.add("add-sub-item");

  const addButton = document.createElement("button");
  addButton.textContent = "+";
  addButton.onclick=function(){
    updateItemQuantity(button,1);
  };

  const numberOfItem = document.createElement("p");
  numberOfItem.classList.add("number-of-item");
  numberOfItem.textContent = "0";

  const subButton = document.createElement("button");
  subButton.textContent = "-";
  subButton.onclick=function(){
    updateItemQuantity(button,-1);
  };

  addSubItem.appendChild(addButton);
  addSubItem.appendChild(numberOfItem);
  addSubItem.appendChild(subButton);
  cartItem.appendChild(addSubItem);

  return cartItem;
}
