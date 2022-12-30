import './styles.css';
import products from './assets/data/data.js';
//import { isConstructorDeclaration } from 'typescript';

const MainPage = () => {
  const mainContent = document.querySelector('main');
  mainContent.innerHTML = `<section class="main__filters filters"></section>
<section class="main__products products"></section>`;

  let productsField = document.querySelector('.products');
  let data = JSON.parse(localStorage.getItem('products'))
    ? JSON.parse(localStorage.getItem('products'))
    : products;
  localStorage.setItem('products', JSON.stringify(data));

  const showProductCards = () => {
    productsField.innerHTML = products
      .map((product) => {
        return `<div class="products__item">
  <div class="products__title">${products.title}</div>
  <div class="products__photo">
    <img class="products__img" src=${
      !!product.images.length && product.images[0] ? product.images[0] : product.images
    }>
  </div>
  <div class="products__price">${product.price} $</div>
  <div class="products__options">
    <button class="products__details" id="${product.id}">Details</button>
    <button class="products__cart" id="${product.id}-adding">Add To Cart</button>
  </div>
</div>`;
      })
      .join('');
    return productsField;
  };

  mainContent.append(showProductCards());

  //adding data to filters
  let filters = document.querySelector('.filters');

  const showTopButtons = () => {
    const topButtons = document.createElement('div');
    topButtons.className = 'filters__buttons';
    topButtons.innerHTML = `<button class="filters__buttons-reset filters__btn">Reset</button>
        <button class="filters__buttons-copy filters__btn">CopyLink</button>`;
    return topButtons;
  };

  filters.append(showTopButtons());
  //filter-blocks
  let category = document.createElement('div');
  let categoryTitle = document.createElement('h3');
  let categoryList = document.createElement('div');

  category.className = 'filters__category category';
  categoryTitle.className = 'filters__title category__title';
  categoryList.className = 'category__list';
  categoryTitle.innerHTML = 'Category';

  filters.append(category);
  category.append(categoryTitle);
  category.append(categoryList);

  category.append(filterMaker(categoryList, getProductsCategories()));

  function getProductsCategories() {
    return data
      .map((productCategory) => productCategory.category)
      .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);
  }

  function getProductsBrands() {
    return data
      .map((productBrand) => productBrand.brand)
      .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);
  }

  function filterMaker(filterList, filterFunction) {
    filterList.innerHTML = filterFunction
      .map((filterItem) => {
        return `<div class="checkbox-line item-active">
    <input id="${filterItem}" type="checkbox">
    <label for="${filterItem}">${filterItem}</label>
    <span></span>
  </div>`;
      })
      .join('');
    return filterList;
  }

  let brand = document.createElement('div');
  let brandTitle = document.createElement('h3');
  let brandList = document.createElement('div');

  brand.className = 'filters__brand brand';
  brandTitle.className = 'filters__title brand__title';
  brandList.className = 'brand__list';
  brandTitle.innerHTML = 'Brand';

  filters.append(brand);
  brand.append(brandTitle);
  brand.append(brandList);

  brand.append(filterMaker(brandList, getProductsBrands()));

  //double-pointing bars
  const showRangeBar = (whatTheRange, divider) => {
    const rangeFilter = document.createElement('div');
    rangeFilter.className = `filters__${whatTheRange} ${whatTheRange}`;
    rangeFilter.innerHTML = `
  <h3 class="filters__title ${whatTheRange}__title">${whatTheRange}</h3>
  <div class="${whatTheRange}__list">
    <div class="${whatTheRange}__min">
      <input class="${whatTheRange}__min-input" type="number" value="0" />
    </div>
    <div class="${whatTheRange}__divider">${divider}</div>
    <div class="${whatTheRange}__max">
      <input class="${whatTheRange}__max-input" type="number" value="3000" />
    </div>
  </div>
  <div class="${whatTheRange}__slider">
    <div class="${whatTheRange}__progress"></div>
  </div>
  <div class="${whatTheRange}__range-input">
    <input class="${whatTheRange}__range-min" type="range" min="0" max="3000" value="0" step="10" />
    <input
      class="${whatTheRange}__range-max"
      type="range"
      min="0"
      max="2000"
      value="2000"
      step="10"
    />
  </div>
`;
    return rangeFilter;
  };

  filters.append(showRangeBar('price', '$'));
  filters.append(showRangeBar('stock', '-'));

  //price progress-bar
  const rangeInput = document.querySelectorAll('.price__range-input input');
  const priceInput = document.querySelectorAll('.price__list input');
  const priceProgress = document.querySelector('.price__slider .price__progress');
  let priceGap = 10;
  let priceSelector = 'price__range-min';

  //stock progress-bar
  const stockRangeInput = document.querySelectorAll('.stock__range-input input');
  const stockInput = document.querySelectorAll('.stock__list input');
  const stockProgress = document.querySelector('.stock__slider .stock__progress');
  let stockGap = 10;
  let stockSelector = 'stock__range-min';

  function progressBarControls(numberInput, progressBarInput, progressBar, gap, rangeSelector) {
    numberInput.forEach((input) => {
      input.addEventListener('input', (el) => {
        let minValue = parseInt(numberInput[0].value);
        let maxValue = parseInt(numberInput[1].value);

        if (maxValue - minValue < gap) {
          if (el.target.className == rangeSelector) {
            numberInput[0].value = maxValue - gap;
          } else {
            numberInput[1].value = minValue + gap;
          }
        } else {
          progressBarInput[0].value = minValue;
          progressBarInput[1].value = maxValue;
          progressBar.style.left = (minValue / numberInput[0].max) * 100 + '%';
          progressBar.style.right = 100 - (maxValue / numberInput[1].max) * 100 + '%';
        }
      });
    });
  }

  progressBarControls(rangeInput, priceInput, priceProgress, priceGap, priceSelector);
  progressBarControls(stockRangeInput, stockInput, stockProgress, stockGap, stockSelector);

  stockInput.forEach((input) => {
    input.addEventListener('input', (el) => {
      let minValue = parseInt(stockInput[0].value);
      let maxValue = parseInt(stockInput[1].value);

      if (maxValue - minValue >= stockGap && maxValue <= 1000) {
        if (el.target.className == 'stock__min-input') {
          stockRangeInput[0].value = minValue;
          stockProgress.style.left = (minValue / stockRangeInput[0].max) * 100 + '%';
        } else {
          stockRangeInput[1].value = maxValue;
          stockProgress.style.right = 100 - (maxValue / stockRangeInput[1].max) * 100 + '%';
        }
      }
    });
  });

  //details
  let productDetailsBtns = document.querySelectorAll('.products__details');

  productDetailsBtns.forEach((el) =>
    el.addEventListener('click', function (e) {
      let target = e.target;
      localStorage.setItem('product', JSON.stringify(data[target.id - 1]));
      //console.log(data[target.id]);
      document.location.href = './pages/product-page/product.html';
    })
  );

  //add to cart
  let productCartBtns = document.querySelectorAll('.products__cart');
  let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [];

  let cartAmount = document.querySelector('.order__amount');
  cartAmount.innerHTML = JSON.parse(localStorage.getItem('cartAmount'))
    ? JSON.parse(localStorage.getItem('cartAmount'))
    : 0;

  let orderSum = document.querySelector('.order__sum');
  orderSum.innerHTML = JSON.parse(localStorage.getItem('orderSum'))
    ? JSON.parse(localStorage.getItem('orderSum'))
    : 0;

  productCartBtns.forEach((el) =>
    el.addEventListener('click', function (e) {
      let target = e.target;
      cartProducts.push(data[parseInt(target.id) - 1]);
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      console.log(cartProducts);
      cartAmount.innerHTML = cartProducts.length;
      localStorage.setItem('cartAmount', JSON.stringify(cartAmount.innerHTML));
      orderSum.innerHTML =
        parseInt(orderSum.innerHTML) + parseInt(data[parseInt(target.id) - 1].price);
      localStorage.setItem('orderSum', JSON.stringify(orderSum.innerHTML));
      //e.target.innerHTML = 'Drop From Cart';
    })
  );
};
MainPage();
//export { product };
