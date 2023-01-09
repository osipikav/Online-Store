import '../styles/styles.css';
import { locationHandler } from './routing';
import { createPurchaseModal } from '../pages/purchase-page/purchase';

localStorage.setItem('cartProducts', '[]');
locationHandler();
window.location.hash = "#main";

createPurchaseModal();

window.addEventListener('hashchange', locationHandler);
