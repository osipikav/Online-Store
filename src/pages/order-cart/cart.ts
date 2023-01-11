import { IProduct } from '../../types/types';
import { trackingProducts } from '../../features/features';
import { createPurchaseModal } from '../purchase-page/purchase';

function cartPage(products: IProduct[]) {
  const main: HTMLDivElement | null = document.querySelector('.main');
  if (main !== null) {
    main.innerHTML = ``;
  }
  const cartProducts: number[] = JSON.parse(localStorage.getItem('cartProducts') || '');

  let position = 0;

  const cartAmount: HTMLDivElement | null = document.querySelector('.order__amount');
  const totalPrice: HTMLDivElement | null = document.querySelector('.order__sum');

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
<div class=" ">Items: <input type="text" id="numberOfItems" value="${cartAmount?.textContent}"></div>
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
    Products: <span>${cartAmount?.textContent}</span>
  </div>
  <div class="summary__total">Total: $<span>${totalPrice?.textContent}</span></div>
  <div class="summary__new-total"></div>
  <div class="summary__promo"><input type="text" id="promo" placeholder="Enter code" /></div>
  <div class="promo-description"></div>
  <p class="about-promo">promo for test 'RS', 'JS'</p>
  <button class="buy-now">Buy Now</button>`;
    return summarySection;
  }

  // function showTotalPrice() {
  //   return products.reduce((total: number, product) => {
  //     const { id, price } = product;
  //     for (const orderedId of cartProducts) {
  //       if (orderedId == id) {
  //         total += price;
  //       }
  //     }
  //     return total;
  //   }, 0);
  // }

  function showOrderedItems() {
    return products.map((product) => {
      const { id } = product;
      if (cartProducts.includes(id)) productSection.append(orderedItem(product));
    });
  }

  function orderedItem(product: IProduct) {
    position++;
    const { id, title, description, price, discountPercentage, rating, stock, thumbnail } = product;

    const amount = cartProducts.filter((el) => {
      if (el == id) {
        return true;
      } else return false;
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

  function getSummary() {
    const summaryProducts = document?.querySelector('.summary__products span');
    const summaryTotal = document?.querySelector('.summary__total span');
    const inputCode: HTMLInputElement | null = document.querySelector('#promo');
    // const aboutPromo = document.querySelector('.about-promo');
    const newTotal = document.querySelector('.summary__new-total');

    if (summaryProducts !== null && summaryTotal !== null) {
      summaryProducts.textContent = String(document.querySelector('.order__amount')?.textContent);
      const summaryPrice = Number(document.querySelector('.order__sum')?.textContent);
      summaryTotal.textContent = String(summaryPrice);

      function promoAdding(discount: number, promo: string) {
        const promoDescription = document.querySelector('.promo-description');
        console.log(promoDescription);

        if (promoDescription !== null) {const div = document.createElement('div');
            div.innerHTML = `Promo "${promo}" -${discount}%
        <button>add</button>
        `;
          promoDescription.append(
            
             div
          );
        }
        const button = promoDescription?.querySelector('button');
        button?.addEventListener('click', (e) => {
          const newTotalSum = summaryPrice * (1 - discount * 0.01);
          if (e.target instanceof HTMLButtonElement && newTotal !== null) {
            if (e.target.textContent === 'add') {
              newTotal.innerHTML = `Total: $<span>${newTotalSum}</span>`;
              button.textContent = 'drop';
            } else {
              newTotal.innerHTML = '';
              button.textContent = 'add';
            }

            console.log(e.target.textContent);
          }
        });
      }

      inputCode?.addEventListener('input', function () {
        const promoCodeValue: string = this.value;

        switch (promoCodeValue.toUpperCase()) {
          case 'RS':
            return promoAdding(10, promoCodeValue);
          case 'JS':
            return promoAdding(20, promoCodeValue);
          default:
            return;
        }
      });
    }
  }

  getSummary();
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

  const inputPromoCode = document.getElementById('promo');

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
