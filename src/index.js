import products from './assets/data/data.js';

let numberOfProducts = products.length;
let productsField = document.querySelector('.products');
let data = JSON.parse(localStorage.getItem('products'))
  ? JSON.parse(localStorage.getItem('products'))
  : products;
localStorage.setItem('products', JSON.stringify(data));
/*//loading with API 

let url = "https://api.escuelajs.co/api/v1/products";
let data;

let numberOfProducts = 41;

async function getProducts() {
  try {
    let res = await fetch(url);
    data = await res.json();
    mkProducts();
  } catch (error) {
    console.log(error);
  }
}
getProducts(); */

function itemMaker(i) {
  let productItem = document.createElement('div');
  let productTitle = document.createElement('div');
  let productPhoto = document.createElement('div');
  let productImg = document.createElement('img');
  let productPrice = document.createElement('div');
  let productCur = document.createElement('span');
  let productOptions = document.createElement('div');
  let productDetails = document.createElement('button');
  let productCart = document.createElement('button');

  productItem.className = 'products__item';
  productTitle.className = 'products__title';
  productPhoto.className = 'products__photo';
  productImg.className = 'products__img';
  productPrice.className = 'products__price';
  productCur.className = 'products__currency';
  productOptions.className = 'products__options';
  productDetails.className = 'products__details';
  productCart.className = 'products__cart';

  productsField.append(productItem);
  productItem.append(productTitle);
  productItem.append(productPhoto);
  productItem.append(productPrice);
  productItem.append(productOptions);
  productPhoto.append(productImg);
  productOptions.append(productDetails);
  productOptions.append(productCart);

  productImg.src = data[i].images[0] ? data[i].images[0] : data[i].images;
  productTitle.innerHTML = data[i].title;
  productCur.innerHTML = '$';
  productPrice.innerHTML = `${data[i].price} ${productCur.innerHTML}`;
  productDetails.innerHTML = 'Details';
  productCart.innerHTML = 'Add To Cart';

  productDetails.setAttribute('id', `${data[i].id}`);
  productCart.setAttribute('id', `${data[i].id}-add`);
}

function mkProducts() {
  for (let i = 0; i < numberOfProducts; i++) {
    itemMaker(i);
  }
}

mkProducts();

//adding data to filters
let filters = document.querySelector('.filters');
//top buttons
let filtersBtns = document.createElement('div');
filtersBtns.className = 'filters__buttons';

let resetBtn = document.createElement('button');
resetBtn.className = 'filters__buttons-reset filters__btn';
filtersBtns.append(resetBtn);
resetBtn.innerHTML = 'Reset';
let copyLink = document.createElement('button');
copyLink.className = 'filters__buttons-copy filters__btn';
filtersBtns.append(copyLink);
copyLink.innerHTML = 'CopyLink';
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

let parentBlock;
let prodArray = [];

function filterMaker(index) {
  let filterItem = document.createElement('div');
  let filterBox = document.createElement('input');
  let filterLabel = document.createElement('label');
  let filterSpan = document.createElement('span');

  filterItem.className = 'checkbox-line item-active';
  filterBox.id = prodArray[index];
  filterBox.type = 'checkbox';
  filterLabel.htmlFor = prodArray[index];

  parentBlock.append(filterItem);
  filterItem.append(filterBox);
  filterItem.append(filterLabel);
  filterItem.append(filterSpan);

  filterLabel.innerHTML = prodArray[index];
}

function categoryArray() {
  prodArray = data
    .map((el) => el.category)
    .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);
}

function mkFilterItems() {
  parentBlock = categoryList;
  categoryArray();
  for (let i = 0; i < prodArray.length; i++) {
    filterMaker(i);
  }
}

mkFilterItems();

let brand = document.createElement('div');
//blocks order!!!!!!!!!!!!!!
filters.prepend(brand);
filters.prepend(category);
filters.prepend(filtersBtns);

brand.className = 'filters__brand brand';
let brandTitle = document.createElement('h3');
brand.append(brandTitle);
brandTitle.className = 'filters__title brand__title';
brandTitle.innerHTML = 'Brand';
let brandList = document.createElement('div');
brand.append(brandList);
brandList.className = 'brand__list';

function brandArray() {
  prodArray = data
    .map((el) => el.brand)
    .reduce((arr, item) => (arr.includes(item) ? arr : [...arr, item]), []);
}

function mkBrandItems() {
  parentBlock = brandList;
  brandArray();
  for (let i = 0; i < prodArray.length; i++) {
    filterMaker(i);
  }
}

mkBrandItems();

//price filter-block
/* let filterPrice = document.createElement("div");
let priceTitle = document.createElement("h3");
let priceList = document.createElement("div");

filters.append(filterPrice);
filterPrice.append(priceTitle);
filterPrice.append(priceList);

filterPrice.className = "filters__price price";
priceTitle.className = "filters__title price__title";
priceTitle.innerHTML = "Price";
priceList.className = "price__list"; */

//stock filter-block
/* let filterStock = document.createElement("div");
let stockTitle = document.createElement("h3");
let stockList = document.createElement("div");

filters.append(filterStock);
filterStock.append(stockTitle);
filterStock.append(stockList);

filterStock.className = "filters__stock stock";
stockTitle.className = "filters__title stock__title";
stockTitle.innerHTML = "Stock";
stockList.className = "stock__list"; */

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

//document.getElementById("checkbox").checked = true;
//export { product };
