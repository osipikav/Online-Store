import { IProduct } from '../../types/types';
import { trackingProducts } from '../../features/features';

function cartPage(products: IProduct[]) {
  const main: HTMLDivElement | null = document.querySelector('.main');
  if (main !== null) {
    main.innerHTML = ``;
  };
  const cartProducts: number[] = JSON.parse(localStorage.getItem('cartProducts') || '');

  let position = 0;

  const cartAmount: HTMLDivElement | null = document.querySelector('.order__amount');
  const amountOfItems = cartProducts.length;
  if (cartAmount !== null) {
    cartAmount.innerHTML = String(amountOfItems);
  }

  const productSection = document.createElement('section');
  const summarySection = document.createElement('section');
  productSection.className = 'main__ordered ordered';
  summarySection.className = 'summary';
  main?.append(productSection);
  main?.append(orderedSectionSummary());
  productSection.append(orderedSectionHead());

  showOrderedItems();

  function orderedSectionHead() {
    const orderedHeader = document.createElement('div');
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
  <div class="summary__total">Total: $<span class="summary__total_amount">
  ${showTotalPrice()}</span></div>
  <div class="summary__promo"><input type="text" id="promo" placeholder="Enter code" /></div>
  <p class="about-promo">promo for test 'RS', 'JS'</p>
  <button class="buy-now">Buy Now</button>`;
    return summarySection;
  }

  function showTotalPrice() {
    return products.reduce((total: number, product) => {
      const { id, price } = product;
      for (const orderedId of cartProducts) {
        if (orderedId == id) {
          total += price;
        }
      }
      return total;
    }, 0);
  }

  function showOrderedItems() {
    return products.map((product) => {
      const { id } = product;
      if (cartProducts.includes(id)) productSection.append(orderedItem(product));
    });
  }

  function orderedItem(product: IProduct) {
    position++;
    const {
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      thumbnail,
    } = product;

    const amount = cartProducts.filter((el) => {
      if (el == id) {
        return true
      } else return false
    }).length;

    const orderedProduct = document.createElement('div');
    orderedProduct.className = 'ordered__product';
    orderedProduct.id = `item${id}`;
    orderedProduct.innerHTML = `<div class="ordered__number">${position}</div>
  <div class="ordered__item item">
    <img class="item__img" src="${thumbnail}">
      <div class="item__info">
        <div class="item__title">${title}</div>
        <div class="item__description">${description}</div>
        <div class="item__additionally">
          <div class="item__rating">Rating: ${rating}</div>
          <div class="item__discount">Discount: ${discountPercentage}%</div>
        </div>
      </div>
  </div>
  <div class="ordered__manage" id="${id}">
    <div class="ordered__stock">Stock: <span>${stock}</span></div>
    <div class="ordered__how-many" >
      <button class="ordered__how-many_drop">-</button>
      <span class="ordered__how-many_amount">${amount}</span>
            <button class="ordered__how-many_drop">+</button>
    </div>
    <div class="ordered__item-price">$ <span id="price${id}">${price}</span></div>
  </div>`;

    return orderedProduct;
  }

  function isEmpty() {
    if (cartProducts.length == 0) {
      document.querySelector('.main__ordered')?.remove();
      document.querySelector('.summary')?.remove();
      const cartTitle = document.createElement('h2');
      main?.append(cartTitle);
      cartTitle.innerHTML = 'Your cart is empty';
      cartTitle.style.setProperty('color', '#EEC353');
      if (cartAmount !== null) {
        cartAmount.innerHTML = '0';
      }
    }
  }

  isEmpty();

  const dropThisItem = document.querySelectorAll('.ordered__how-many_drop');
  dropThisItem.forEach((button) => {
    button.addEventListener('click', function (e) {
      if (e.target instanceof HTMLButtonElement) {
        trackingProducts(e.target);
      }
    });
  });

  const buyButton = document.querySelector('.buy-now');
  if (buyButton !== null) {
    buyButton.addEventListener('click', () => {
      createPurchaseModal();
    });
  }

  // function showAddingPromoRsButton() {
  //   return (document?.querySelector('.about-promo').innerHTML =
  //     'Rolling Scopes - 20% <button class="add-promo">Add</button>');
  // }

  // function showAddingPromoJsButton() {
  //   return (document.querySelector('.about-promo').innerHTML =
  //     'Java Script - 10% <button class="add-promo">Add</button>');
  // }

  // function showAddingPromoNoButton() {
  //   return (document.querySelector('.about-promo').innerHTML = `promo for test 'RS', 'JS'`);
  // }
  // //console.log(showAddingPromoButton());
  // const inputPromoCode = document.getElementById('promo');

  // inputPromoCode.oninput = function () {
  //   // const promoCodeValue = document.getElementById('promo').value;
  //   console.log('object :>> ',);
  //   const promoDescription = document.querySelector('.about-promo');
  //   if (promoDescription !== null) {
  //     promoDescription.innerHTML = promoCodeValue;

  //     switch (promoCodeValue) {
  //       case 'RS':
  //         return showAddingPromoRsButton();
  //       case 'JS':
  //         return showAddingPromoJsButton();
  //       default:
  //         return showAddingPromoNoButton();
  //     }
  //   }
  // };

  // const buttonDiscountAdd = document.querySelector('.add-promo');
  // buttonDiscountAdd.addEventListener('click', function () {
  //   console.log('promo');
  // });
}
export { cartPage };
