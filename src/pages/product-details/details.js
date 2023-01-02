function createDetails(product) {
  const main = document.querySelector('.main');
  main.innerHTML = '';
  main.innerHTML = `
  <section class="main__details details">
    <h2 class="details__title"></h2>
    <div class="details__info">
      <div class="info__miniature"></div>
      <div class="info__thumbnail"></div>
      <div class="info__description-items"></div>
    </div>
    <div class="details__price">
      <div class="buttons">BUY NOW</div>
      <div class="price">0$</div>
      <div class="buttons">ADD TO CARD</div>
    </div>
  </section>
  `;

  const title = document.querySelector('.details__title');
  const miniaturesDiv = document.querySelector('.info__miniature');
  const thumbnailDiv = document.querySelector('.info__thumbnail');
  const descrItems = document.querySelector('.info__description-items');
  const price = document.querySelector('.price');
  const addButton = document.querySelectorAll('.buttons')[1];
  const buyButton = document.querySelectorAll('.buttons')[0];
  const itemsCategories = [
    'description',
    'discountPercentage',
    'rating',
    'stock',
    'brand',
    'category',
  ];

  title.textContent = product.title;

  product.images.forEach((img, i) => {
    if (i < product.images.length - 1) {
      let miniatureImg = document.createElement('img');
      miniatureImg.src = img;
      miniatureImg.alt = 'img';
      miniaturesDiv.append(miniatureImg);

      miniatureImg.addEventListener('click', (event) => {
        document.querySelector('.info__thumbnail img').src = event.target.src;
      });
    }
  });

  let thumbnailImg = document.createElement('img');
  thumbnailImg.src = product.thumbnail;
  thumbnailDiv.append(thumbnailImg);

  itemsCategories.forEach((itemsCategoriesElement) => {
    let descriptionElement = document.createElement('div');
    descriptionElement.classList = `description-item ${itemsCategoriesElement}`;
    let descriptionName = document.createElement('div');
    descriptionName.classList = 'item-title';
    descriptionName.textContent = `${itemsCategoriesElement}:`;
    if (itemsCategoriesElement == 'discountPercentage') {
      descriptionName.textContent = `discount:`;
    }
    let descriptionValue = document.createElement('div');
    descriptionValue.classList = 'item-prop';
    descriptionValue.textContent = `${product[itemsCategoriesElement]}`;

    descrItems.append(descriptionElement);
    descriptionElement.append(descriptionName, descriptionValue);
  });

  price.textContent = `${product.price}$`;

  addButton.addEventListener('click', () => {
    console.log('add');
  });
  buyButton.addEventListener('click', () => {
    console.log('buy');
  });
  // document.location.href = '#details';
}

export { createDetails };
