const product = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  ],
};

const details = document.querySelector(".details");
const title = document.querySelector(".details__title");
const miniaturesDiv = document.querySelector(".info__miniature");
const thumbnailDiv = document.querySelector(".info__thumbnail");
const descrItems = document.querySelector(".info__description-items");
const price = document.querySelector(".price");
const descriptionArray = [
  "description",
  "discountPercentage",
  "rating",
  "stock",
  "brand",
  "category",
];

function createDetails() {
  title.textContent = product.title;

  product.images.forEach((img, i) => {
    if (i < product.images.length - 1) {
      let miniatureImg = document.createElement("img");
      miniatureImg.src = img;
      miniatureImg.alt = "img";
      miniaturesDiv.append(miniatureImg);

      miniatureImg.addEventListener("click", (event) => {
        document.querySelector(".info__thumbnail img").src = event.target.src;
      });
    }
  });

  let thumbnailImg = document.createElement("img");
  thumbnailImg.src = product.thumbnail;
  thumbnailDiv.append(thumbnailImg);

  descriptionArray.forEach((descriptionArrayElement) => {
    let descriptionElement = document.createElement("div");
    descriptionElement.classList = `description-item ${descriptionArrayElement}`;
    let descriptionName = document.createElement("div");
    descriptionName.classList = "item-title";
    descriptionName.textContent = `${descriptionArrayElement}:`;
    if (descriptionArrayElement == "discountPercentage") {
      descriptionName.textContent = `discount:`;
    }
    let descriptionValue = document.createElement("div");
    descriptionValue.classList = "item-prop";
    descriptionValue.textContent = `${product[descriptionArrayElement]}`;

    descrItems.append(descriptionElement);
    descriptionElement.append(descriptionName, descriptionValue);
  });

  price.textContent = `${product.price}$`;
}

createDetails();
