import './styles.css';
import products from './assets/data/data.js';
//import { isConstructorDeclaration } from 'typescript';

const mainPage = () => {
  const maimContent = document.querySelector('main');
  maimContent.innerHTML = `<section class="main__filters filters"></section>
<section class="main__products products"></section>`;

  let productsField = document.querySelector('.products');
  let data = JSON.parse(localStorage.getItem('products'))
    ? JSON.parse(localStorage.getItem('products'))
    : products;
  localStorage.setItem('products', JSON.stringify(data));

  const showProductCards = () => {
    //const productItem = document.createElement('div');
    //productItem.className = 'products__item';
    productsField.innerHTML = products
      .map((product) => {
        return `<div class="products__item">
  <div class="products__title">${product.title}</div>
  <div class="products__photo">
    <img class="products__img" src=${product.images[0] ? product.images[0] : product.images}>
  </div>
  <div class="products__price">${product.price} $</div>
  <div class="products__options">
    <button class="products__details" id="${product.id}">Details</button>
    <button class="products__cart" id="${product.id}-adding">Add To Cart</button>
  </div>
</div>`;
      })
      .join('');
    //return productsField;
  };

  productsField.append(showProductCards());

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

  category.className = 'filters__category category';
  let categoryTitle = document.createElement('h3');
  category.append(categoryTitle);
  categoryTitle.className = 'filters__title category__title';
  categoryTitle.innerHTML = 'Category';
  let categoryList = document.createElement('div');
  category.append(categoryList);
  categoryList.className = 'category__list';

  function categoryArray() {
    return data
      .map((el) => el.category)
      .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);
  }

  function brandArray() {
    return data
      .map((el) => el.brand)
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
    console.log(filterList.innerHTML);
    //return categoryList;
  }

  categoryList.append(filterMaker(categoryList, categoryArray()));

  console.log(filterMaker);
  let brand = document.createElement('div');
  //blocks order!!!!!!!!!!!!!!
  filters.append(category);
  filters.append(brand);

  brand.className = 'filters__brand brand';
  let brandTitle = document.createElement('h3');
  brand.append(brandTitle);
  brandTitle.className = 'filters__title brand__title';
  brandTitle.innerHTML = 'Brand';
  let brandList = document.createElement('div');
  brand.append(brandList);
  brandList.className = 'brand__list';

  brandList.append(filterMaker(brandList, brandArray()));
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

  rangeInput.forEach((input) => {
    input.addEventListener('input', (el) => {
      let minValue = parseInt(rangeInput[0].value);
      let maxValue = parseInt(rangeInput[1].value);

      if (maxValue - minValue < priceGap) {
        if (el.target.className == 'price__range-min') {
          rangeInput[0].value = maxValue - priceGap;
        } else {
          rangeInput[1].value = minValue + priceGap;
        }
      } else {
        priceInput[0].value = minValue;
        priceInput[1].value = maxValue;
        priceProgress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
        priceProgress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
      }
    });
  });

  priceInput.forEach((input) => {
    input.addEventListener('input', (el) => {
      let minValue = parseInt(priceInput[0].value);
      let maxValue = parseInt(priceInput[1].value);

      if (maxValue - minValue >= priceGap && maxValue <= 3000) {
        if (el.target.className == 'price__min-input') {
          rangeInput[0].value = minValue;
          priceProgress.style.left = (minValue / rangeInput[0].max) * 100 + '%';
        } else {
          rangeInput[1].value = maxValue;
          priceProgress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + '%';
        }
      }
    });
  });

  //stock progress-bar
  const stockRangeInput = document.querySelectorAll('.stock__range-input input');
  const stockInput = document.querySelectorAll('.stock__list input');
  const stockProgress = document.querySelector('.stock__slider .stock__progress');
  let stockGap = 10;

  stockRangeInput.forEach((input) => {
    input.addEventListener('input', (el) => {
      let minValue = parseInt(stockRangeInput[0].value);
      let maxValue = parseInt(stockRangeInput[1].value);

      if (maxValue - minValue < stockGap) {
        if (el.target.className == 'stock__range-min') {
          stockRangeInput[0].value = maxValue - stockGap;
        } else {
          stockRangeInput[1].value = minValue + stockGap;
        }
      } else {
        stockInput[0].value = minValue;
        stockInput[1].value = maxValue;
        stockProgress.style.left = (minValue / stockRangeInput[0].max) * 100 + '%';
        stockProgress.style.right = 100 - (maxValue / stockRangeInput[1].max) * 100 + '%';
      }
    });
  });

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
mainPage();
//export { product };
