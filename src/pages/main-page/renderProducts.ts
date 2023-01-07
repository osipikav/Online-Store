import { IProduct } from '../../types/types';

function renderProducts(products: IProduct[]) {
  const mainContent: HTMLDivElement | null = document.querySelector('.main');
  if (mainContent !== null) {
    mainContent.innerHTML = `
  <section class="main__filters filters"></section>
  <section class="main__products">
    <div class="products__top-panel"></div>
    <div class="products"></div>
  </section>`;
  }
  const productsField: HTMLDivElement | null = document.querySelector('.products');
  console.log('productsField :>> ', productsField);
  const productsTopPanel: HTMLDivElement | null = document.querySelector('.products__top-panel');
  if (productsTopPanel !== null) {
    productsTopPanel.innerHTML = `
    <div class="sort">
      <select>
	    <option>Sort by default</option>
	    <option>Highest price</option>
	    <option>Lowest price</option>
	    <option>Highest rating</option>
	    <option>Highest discount %</option>
	  </select>
    </div>
    <div class="top-panel__found"> Found: ${products.length}</div>
    <div class="top-panel__search">search</div>
    <div class="display-options">
      <div class="tiles options display-active"> 
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="list options">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>`;
  }
  const displayOptions = document.querySelectorAll(".options");
  displayOptions.forEach((displayValue) => {
    displayValue.addEventListener('click', () => {
      displayOptions[1].classList.toggle('display-active')
      displayOptions[0].classList.toggle('display-active')
      productsField?.classList.toggle('products-inline')
    })
  })
  const select: HTMLSelectElement | null = document.querySelector('select');
  select?.addEventListener('change', function () {
    if (this.value === "Lowest price") {
      products = products.sort((x, y) => x.price - y.price);
    } else if
      (this.value === "Highest price") {
      products = products.sort((x, y) => y.price - x.price);
    } else if
      (this.value === "Highest rating") {
      products = products.sort((x, y) => x.rating - y.rating);
    } else if
      (this.value === "Highest discount %") {
      products = products.sort((x, y) => x.discountPercentage - y.discountPercentage);
    } else {
      products = products.sort((x, y) => x.id - y.id);
    }
    showProductCards(products)
  });

  const showProductCards = (products: IProduct[]): void => {
    if (productsField !== null) {
      productsField.innerHTML = products
        .map((product: IProduct) => {
          const { id, title, thumbnail, price } = product;
          let buttonValue = 'Add To Cart';
          if (JSON.parse(localStorage.getItem('cartProducts') || '').includes(id)) {
            buttonValue = 'Drop From Cart';
          };
          return `<div class="products__item">
    <div class="products__title">${title}</div>
    <div class="products__photo" style="background-image: url(${thumbnail})"></div>
    <div class="products__price">${price} $</div>
    <div class="products__options">
      <button class="products__details" id="${id}">Details</button>
      <button class="products__cart" id="${id}">${buttonValue}</button>
    </div>
  </div>`;
        })
        .join('');
    }
  };
  showProductCards(products)
}


export { renderProducts }