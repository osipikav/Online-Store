import { createDetails } from '../pages/product-details/details';
import { create404 } from '../pages/page-404/page-404';
import { mainPage } from '../pages/main-page/main';
import { products } from '../assets/data/data';

export const locationHandler = () => {
    const routes = {
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
                const currentId: string = (localStorage.getItem('currentId') || "")
                const product = products[Number(currentId) - 1];
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

    const location = window.location.hash.slice(1);
    let route;
    if (!Object.prototype.hasOwnProperty.call(routes, location)) {
        if (location.length == 0) {
            route = routes['main'];
        } else {
            window.location.hash = '404';
            route = routes['404'];
        }
    } else {
        const key = location as keyof typeof routes;
        route = routes[key];
    }
    document.title = route.title;
    route.render();
};