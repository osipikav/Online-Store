import '../styles/styles.css';
import { locationHandler } from './routing';

localStorage.setItem('cartProducts', '[]');
// localStorage.setItem('cartProducts', '[1, 2,3,7]');
locationHandler();
// window.location.hash = "#main";
// window.location.hash = "#cart";
window.addEventListener('hashchange', locationHandler);
