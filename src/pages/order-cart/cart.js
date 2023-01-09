import products from '../../assets/data/data.js';

let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
  ? JSON.parse(localStorage.getItem('cartProducts'))
  : [3, 4, 7, 14];

let position = 0;
let amount = 1;

let cartAmount = document.querySelector('.order__amount');
let amountOfItems = cartProducts.length;
cartAmount.innerHTML = amountOfItems;

let orderSum = document.querySelector('.order__sum');
orderSum.innerHTML = showTotalPrice();

let main = document.querySelector('main');
let productSection = document.createElement('section');
let summarySection = document.createElement('section');
productSection.className = 'main__ordered ordered';
summarySection.className = 'summary';
main.append(productSection);
main.append(orderedSectionSummary());
productSection.append(orderedSectionHead());
//summarySection.append(orderedSectionSummary());
showOrderedItems();

function orderedSectionHead() {
  let orderedHeader = document.createElement('div');
  orderedHeader.className = 'ordered__header';
  orderedHeader.innerHTML = `<h2>Products in cart</h2>
<div class="ordered__amount">Items: <input type="text" id="numberOfItems" value="${amountOfItems}"></div>
<div class="ordered__pages">
  <div>Page: 
    <button> &lt; </button>
    <span>1</span>
    <button> &gt; </button>
  </div>
</div>`;

  return orderedHeader;
}

function orderedSectionSummary() {
  summarySection.innerHTML = `<div class="summary__header">
  <h2>Summary</h2>
</div>
<div class="summary__products">
  Products: <span class="summary__products_amount">${amountOfItems}</span>
</div>
<div class="summary__total">Total: $<span class="summary__total_amount">${showTotalPrice(
    cartProducts
  )}</span></div>
<div class="summary__promo"><input type="text" id="promo" placeholder="Enter code" /></div>
<p class="about-promo">promo for test 'RS', 'JS'</p>
<button class="by-now">By Now</button>`;
  return summarySection;
}

function showOrderedItems() {
  return products.map((product) => {
    const { id } = product;
    if (cartProducts.includes(id)) productSection.append(orderedItem(product));
  });
}

function showTotalPrice() {
  return products.reduce((total, product) => {
    const { id, price } = product;
    for (let orderedId of cartProducts) {
      if (orderedId == id) {
        total += price;
      }
    }
    return total;
  }, 0);
}

function orderedItem(product) {
  position++;
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    //brand,
    //category,
    images,
  } = product;

  let orderedProduct = document.createElement('div');
  orderedProduct.className = 'ordered__product';
  orderedProduct.id = `item${id}`;
  orderedProduct.innerHTML = `<div class="ordered__number">${position}</div>
  <div class="ordered__item item">
    <img class="item__img" src="${images[0]}">
      <div class="item__info">
        <div class="item__title">${title}</div>
        <div class="item__description">${description}</div>
        <div class="item__additionally">
          <div class="item__rating">Rating: ${rating}</div>
          <div class="item__discount">Discount: ${discountPercentage}%</div>
        </div>
      </div>
  </div>
  <div class="ordered__manage">
    <div class="ordered__stock">Stock: ${stock}</div>
    <div class="ordered__how-many">
      <button class="ordered__how-many_drop">-</button>
      <span class="ordered__how-many_amount" id="${id}">${amount}</span>
      <button class="ordered__how-many_drop">+</button>
    </div>
    <div class="ordered__item-price">$ <span id="price${id}">${price}</span></div>
  </div>`;

  return orderedProduct;
}

function isEmpty() {
  if (cartProducts.length == 0) {
    document.querySelector('.main__ordered').remove();
    document.querySelector('.summary').remove();
    let cartTitle = document.createElement('h2');
    main.append(cartTitle);
    cartTitle.innerHTML = 'Your cart is empty';
    cartTitle.style.setProperty('color', '#EEC353');
    cartAmount.innerHTML = 0;
    console.log(amountOfItems);
  }
}

isEmpty();

let dropThisItem = document.querySelectorAll('.ordered__how-many_drop');

dropThisItem.forEach((button) => {
  let dropAmount = 1;
  button.addEventListener('click', function () {
    if (this.innerHTML == '+') {
      ++amountOfItems;
      cartProducts.push(Number(button.previousElementSibling.id));
      document.querySelector('.summary__products_amount').innerHTML = `${amountOfItems}`;
      document.getElementById(Number(button.previousElementSibling.id)).innerHTML = ++dropAmount;
      document.getElementById(`price${Number(button.previousElementSibling.id)}`).innerHTML =
        products[this.previousElementSibling.id - 1].price * dropAmount;
      orderSum.innerHTML = showTotalPrice(cartProducts);
      document.querySelector('.summary__total_amount').innerHTML = showTotalPrice(cartProducts);
      cartAmount.innerHTML = amountOfItems;
    } else {
      --amountOfItems;
      document.querySelector('.summary__products_amount').innerHTML = `${amountOfItems}`;
      document.getElementById(Number(button.nextElementSibling.id)).innerHTML -= 1;
      document.getElementById(`price${Number(button.nextElementSibling.id)}`).innerHTML -=
        products[this.nextElementSibling.id - 1].price;
      let indexOfRemovingElement = cartProducts.indexOf(parseInt(this.nextElementSibling.id));
      cartProducts.splice(indexOfRemovingElement, 1);

      if (document.getElementById(Number(button.nextElementSibling.id)).innerHTML == 0) {
        document.getElementById(`item${button.nextElementSibling.id}`).remove();
      }
      isEmpty();
      orderSum.innerHTML = showTotalPrice(cartProducts);
      if (cartProducts.length) {
        document.querySelector('.summary__total_amount').innerHTML = showTotalPrice();
      }
      cartAmount.innerHTML = amountOfItems;
    }
    console.log(cartProducts);
  });
});

function showAddingPromoRsButton() {
  return (document.querySelector('.about-promo').innerHTML =
    'Rolling Scopes - 20% <button class="add-promo">Add</button>');
}

function showAddingPromoJsButton() {
  return (document.querySelector('.about-promo').innerHTML =
    'Java Script - 10% <button class="add-promo">Add</button>');
}

function showAddingPromoNoButton() {
  return (document.querySelector('.about-promo').innerHTML = `promo for test 'RS', 'JS'`);
}
//console.log(showAddingPromoButton());
let inputPromoCode = document.getElementById('promo');

inputPromoCode.oninput = function () {
  let promoCodeValue = document.getElementById('promo').value;

  switch (promoCodeValue) {
    case 'RS':
      return showAddingPromoRsButton();
    case 'JS':
      return showAddingPromoJsButton();
    default:
      return showAddingPromoNoButton();
  }
};

let buttonDiscountAdd = document.querySelector('.add-promo');
buttonDiscountAdd.addEventListener('click', function () {});

/* function insertPromoCode (newNode) {
  .parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
 */
/* let promoInput = document.querySelector('.about-promo');
let inputPromoCode = document.getElementById('promo');

function showAddingPromoRsButton() {
  return (promoInput.innerHTML = 'Rolling Scopes - 20% <button class="add-promo">Add</button>');
}

function showAddingPromoJsButton() {
  return (promoInput.innerHTML = 'Java Script - 10% <button class="add-promo">Add</button>');
}

function showAddingPromoNoButton() {
  return (promoInput.innerHTML = `promo for test 'RS', 'JS'`);
}
//console.log(showAddingPromoButton());

inputPromoCode.oninput = function () {
  let promoCodeValue = document.getElementById('promo').value;

  switch (promoCodeValue) {
    case 'RS':
      return showAddingPromoRsButton();
    case 'JS':
      return showAddingPromoJsButton();
    default:
      return showAddingPromoNoButton();
  }
};

let buttonDiscountAdd = document.querySelector('.add-promo');

if (buttonDiscountAdd.innerHTML == 'Add') {
  buttonDiscountAdd.addEventListener('click', function () {
    buttonDiscountAdd.innerHTML = 'Drop';
  });
} */

/* function insertPromoCode (newNode) {
  .parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
 */
