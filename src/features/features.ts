import products from "../assets/data/data";

let orderSumValue = 0;
function trackingProducts(target: HTMLButtonElement) {
  const cartAmount: HTMLElement | null = document.querySelector('.order__amount');
  const orderSum: HTMLElement | null = document.querySelector('.order__sum');
  const cartProductsArr: number[] = JSON.parse(localStorage.getItem('cartProducts') || '');

  if (target.textContent == 'Add To Cart') {
    cartProductsArr.push(Number(target.id));
    orderSumValue += products[Number(target.id) - 1].price;
    target.textContent = 'Drop From Cart';
  } else {
    cartProductsArr.splice(cartProductsArr.indexOf(Number(target.id)), 1);
    target.textContent = 'Add To Cart';
    orderSumValue -= products[Number(target.id) - 1].price;
  }
  if (cartAmount !== null && orderSum !== null) {
    cartAmount.textContent = String(cartProductsArr.length)
    orderSum.textContent = String(orderSumValue);
  }
  localStorage.setItem('cartProducts', JSON.stringify(cartProductsArr));
}

export { trackingProducts }