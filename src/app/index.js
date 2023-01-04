import '../styles/styles.css';

import { createDetails } from '../pages/product-details/details.js';
import { create404 } from '../pages/page-404/page-404.js';
import { mainPage } from '../pages/main-page/main';
import { products } from '../assets/data/data';

localStorage.setItem('cartProducts', '[]');

export const routes = {
  404: {
    title: '404',
    render() {
      create404();
    },
  },
  main: {
    title: 'Main',
    render() {
      mainPage(products);
    },
  },
  details: {
    title: 'Product details',
    render() {
      let product = products[+localStorage.getItem('currentId') - 1];
      createDetails(product);
    },
  },
  cart: {
    title: 'Order cart',
    render() {
      console.log('cart');
    },
  },
};

const locationHandler = async () => {
  let location = window.location.hash.slice(1);
  let route;
  if (!Object.prototype.hasOwnProperty.call(routes, location)) {
    if (location.length == 0) {
      route = routes['main'];
    } else {
      window.location.hash = '404';
      route = routes['404'];
    }
  } else {
    route = routes[location];
  }
  document.title = route.title;
  route.render();
};

window.addEventListener('hashchange', locationHandler);
locationHandler();
