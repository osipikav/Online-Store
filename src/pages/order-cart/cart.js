let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
  ? JSON.parse(localStorage.getItem('cartProducts'))
  : 0;

console.log(cartProducts);
let productSection = document.querySelector('.main__ordered');

let cartAmount = document.querySelector('.order__amount');
cartAmount.innerHTML = JSON.parse(localStorage.getItem('cartAmount'))
  ? JSON.parse(localStorage.getItem('cartAmount'))
  : 0;

let itemsAmount = document.querySelector('.ordered__amount').querySelector('input');
itemsAmount.value = JSON.parse(localStorage.getItem('cartAmount'))
  ? JSON.parse(localStorage.getItem('cartAmount'))
  : 0;

let orderSum = document.querySelector('.order__sum');
orderSum.innerHTML = JSON.parse(localStorage.getItem('orderSum'))
  ? JSON.parse(localStorage.getItem('orderSum'))
  : 0;

let cartBtn = document.querySelector('.order__link');
let main = document.querySelector('main');

function isEmpty() {
  let cartTitle = document.createElement('h2');

  if (!cartProducts) {
    main.append(cartTitle);
    document.querySelectorAll('section').forEach((el) => el.classList.add('not-active'));
    cartTitle.innerHTML = 'Your cart is empty';
    cartTitle.style.setProperty('color', '#EEC353');
  } else {
    if (main.contains(cartTitle)) {
      main.removeChild(cartTitle);
      document.querySelectorAll('section').forEach((el) => el.classList.remove('not-active'));
    }
  }
}

isEmpty();
let cartProductId = [];

function orderedItems(i) {
  let orderedProduct = document.createElement('div');
  let orderedNumber = document.createElement('div');
  let orderedItem = document.createElement('div');
  let orderedImg = document.createElement('img');
  let orderedItemInfo = document.createElement('div');
  let orderedItemTitle = document.createElement('div');
  let orderedItemDescription = document.createElement('div');
  let orderedAdditionally = document.createElement('div');
  let orderedItemRating = document.createElement('div');
  let orderedItemDiscount = document.createElement('div');
  let orderedManage = document.createElement('div');
  let orderedStock = document.createElement('div');
  let orderedItemAmount = document.createElement('div');
  let orderedItemPrice = document.createElement('div');

  orderedProduct.className = 'ordered__product';
  orderedNumber.className = 'ordered__number';
  orderedItem.className = 'ordered__item item';
  orderedImg.className = 'item__img';
  orderedItemInfo.className = 'item__info';
  orderedItemTitle.className = 'item__title';
  orderedItemDescription.className = 'item__description';
  orderedAdditionally.className = 'item__additionally';
  orderedItemRating.className = 'item__rating';
  orderedItemDiscount.className = 'item__discount';
  orderedManage.className = 'ordered__manage';
  orderedStock.className = 'ordered__stock';
  orderedItemAmount.className = 'ordered__how-many';
  orderedItemPrice.className = 'ordered__item-price';

  productSection.append(orderedProduct);
  orderedProduct.append(orderedNumber);
  orderedProduct.append(orderedItem);
  orderedProduct.append(orderedManage);
  orderedItem.append(orderedImg);
  orderedItem.append(orderedItemInfo);
  orderedItemInfo.append(orderedItemTitle);
  orderedItemInfo.append(orderedItemDescription);
  orderedItemInfo.append(orderedAdditionally);
  orderedAdditionally.append(orderedItemRating);
  orderedAdditionally.append(orderedItemDiscount);

  orderedManage.append(orderedStock);
  orderedManage.append(orderedItemAmount);
  orderedManage.append(orderedItemPrice);

  orderedNumber.innerHTML = i + 1;
  orderedImg.src = cartProducts[i].images[0] ? cartProducts[i].images[0] : cartProducts[i].images;
  orderedItemTitle.innerHTML = cartProducts[i].title;
  orderedItemDescription.innerHTML = cartProducts[i].description;
  orderedItemRating.innerHTML = `Rating: ${cartProducts[i].rating}`;
  orderedItemDiscount.innerHTML = `Discount: ${cartProducts[i].discountPercentage}%`;

  cartProductId.push(cartProducts[i].id);
}

function showOrderedItems() {
  for (let i = 0; i < cartProducts.length; i++) {
    if (!cartProductId.includes(cartProducts[i].id)) {
      orderedItems(i);
    }
  }
}

showOrderedItems();
