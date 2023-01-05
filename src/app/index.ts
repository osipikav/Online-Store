import '../styles/styles.css';
import { locationHandler } from './routing';

localStorage.setItem('cartProducts', '[]');

locationHandler();
window.addEventListener('hashchange', locationHandler);
