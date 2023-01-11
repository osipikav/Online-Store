import '../styles/styles.css';
import { locationHandler } from './routing';

localStorage.setItem('cartProducts', '[]');
// localStorage.setItem('cartProducts', '[2,4,5,12]');
locationHandler();
window.location.hash = "#main";
// window.location.hash = "#cart";
window.addEventListener('hashchange', locationHandler);
