import './styles.scss';


let products = document.querySelector(".products");
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

getProducts();

function itemMaker(id) {
  let productItem = document.createElement("div");
  let productTitle = document.createElement("div");
  let productPhoto = document.createElement("div");
  let productImg = document.createElement("img");
  let productPrice = document.createElement("div");
  let productCur = document.createElement("span");
  let productOptions = document.createElement("div");
  let productDetails = document.createElement("button");
  let productCart = document.createElement("button");

  productItem.className = "products__item";
  productTitle.className = "products__title";
  productPhoto.className = "products__photo";
  productImg.className = "products__img";
  productPrice.className = "products__price";
  productCur.className = "products__currency";
  productOptions.className = "products__options";
  productDetails.className = "products__details";
  productCart.className = "products__cart";

  products.append(productItem);
  productItem.append(productTitle);
  productItem.append(productPhoto);
  productItem.append(productPrice);
  productItem.append(productOptions);
  productPhoto.append(productImg);
  productOptions.append(productDetails);
  productOptions.append(productCart);

  productImg.src = data[id].images[0] ? data[id].images[0] : data[id].images;
  productTitle.innerHTML = data[id].title;
  productCur.innerHTML = "$";
  productPrice.innerHTML = `${data[id].price} ${productCur.innerHTML}`;
  productDetails.innerHTML = "Details";
  productCart.innerHTML = "Add To Cart";
}

function mkProducts() {
  for (let id = 1; id < numberOfProducts; id++) {
    itemMaker(id);
  }
}

//adding to cart
let productToCart = document.querySelectorAll(".products__cart");
