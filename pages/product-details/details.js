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
const smallImgs = document.querySelector(".info__small-img");
const largeImg = document.querySelector(".info__large-img");
const descrItems = document.querySelector(".info__descr-items");
const price = document.querySelector(".price");
const descrArr = ["description", "discountPercentage", "rating", "stock", "brand", "category"];

function createDetails() {
  title.textContent = product.title;

  product.images.forEach((img, i) => {
    if (i < product.images.length - 1) {
      let smli = document.createElement("img");
      smli.src = img;
      smli.alt = "img";
      smallImgs.append(smli);

      // console.log("smli :>> ", smli);
      // //   smli.onclick = (event) => {
      // //     console.log("i :>> " event.target);
      // //   };
      // // }
      // let sm = document.querySelector(")

      // // debugger
      // sm.AddEvenListener("click", () => {
      //   console.log('object :>> ');
      // });
    }
  });

  let lrgi = document.createElement("img");
  lrgi.src = product.thumbnail;
  largeImg.append(lrgi);

  descrArr.forEach((el) => {
    let descrEl = document.createElement("div");
    descrEl.classList = `descr-item ${el}`;
    let h3_1 = document.createElement("div");
    h3_1.classList = "item-title";
    h3_1.textContent = `${el}:`;
    if (el == "discountPercentage") {
      h3_1.textContent = `discount:`;
    }
    let h3_2 = document.createElement("div");
    h3_2.classList = "item-prop";
    h3_2.textContent = `${product[el]}`;

    descrItems.append(descrEl);
    descrEl.append(h3_1, h3_2);
  });

  price.textContent = `${product.price}$`;
}
createDetails();
