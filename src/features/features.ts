import products from "../assets/data/data";


let orderSumValue = 0;

function trackingProducts() {
  const productCartBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.products__cart');
  const cartAmount = document.querySelector('.order__amount') as HTMLElement;
  const orderSum = document.querySelector('.order__sum') as HTMLElement;
  const cartProductsArr: number[] = JSON.parse(localStorage.getItem('cartProducts') || '');


  productCartBtns.forEach((el) =>
    el.addEventListener('click', function (e: Event) {
      const target = e.target as HTMLButtonElement;

      if (target.textContent == 'Add To Cart') {
        cartProductsArr.push(+target.id);
        orderSumValue += products[+target.id - 1].price;
        target.textContent = 'Drop From Cart';

      } else {
        cartProductsArr.splice(cartProductsArr.indexOf(+target.id), 1);
        target.textContent = 'Add To Cart'
        orderSumValue -= products[+target.id - 1].price;
      }
      cartAmount.textContent = '' + cartProductsArr.length
      orderSum.textContent = '' + orderSumValue;
      localStorage.setItem('cartProducts', JSON.stringify(cartProductsArr));
    })
  );
};

export { trackingProducts }