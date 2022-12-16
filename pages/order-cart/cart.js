/* let cartBtn = document.querySelector('.order__link');
let main = document.querySelector('main');
let sections = document.querySelectorAll('section');
let headLogo = document.querySelector('.nav__link');

let cartTitle = document.createElement('h2');
cartTitle.innerHTML = 'Your cart is empty';
cartTitle.style.setProperty('color', '#EEC353');

let cartOn = true;

function mainHide() {
    sections.forEach(el => el.classList.add('not-active'));
    main.append(cartTitle);
    cartOn = false;
}

function mainShow() {
    sections.forEach(el => el.classList.remove('not-active'));
    main.removeChild(cartTitle);
    cartOn = true;
}

cartBtn.addEventListener('click', function() {
    if(cartOn) {
        mainHide();   
    } else {
        mainShow();
    }
});

headLogo.addEventListener('click', function() {
    if(!cartOn) {
        mainShow();
    }
})
 */