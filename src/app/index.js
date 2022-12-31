import '../styles/styles.css';

import { createDetails } from '../pages/product-details/details.js';
import { create404 } from '../pages/page-404/page-404.js';
import { mainPage } from '../pages/main-page/main.js';

import { products } from '../assets/data/data.js';

const product = products[11];

const routes = {
  404: {
    title: '404',
    render: create404,
  },
  main: {
    title: 'Main',
    render: mainPage,
  },
  details: {
    title: 'Product details',
    render: createDetails,
  },
  cart: {
    title: 'Order cart',
    render: () => {
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
  route.render(product);
};

window.addEventListener('hashchange', locationHandler);
locationHandler();
