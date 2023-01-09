function createPurchaseModal() {
    const purchase = document.createElement('section')
    document.querySelector('.main')?.append(purchase)
    purchase.innerHTML = `
    <form id="form">
          <h2 class="form-title">Personal details</h2>
          <div class="form-item">
            <input type="text" name="name" id="name" placeholder="Name" />
          </div>
          <div class="form-item">
            <input type="text" name="phone" id="phone" placeholder="Phone number"  />
          </div>
          <div class="form-item">
            <input type="text" name="address" id="address" placeholder="Delivery address" />
          </div>
          <div class="form-item">
            <input type="text" name="email" id="email" placeholder="E-mail"  />
          </div>
          <h2 class="form-title">Credit card details</h2>
          <div class="card-details">
            <div class="card-number">
              <input type="tel" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" maxlength="16" 
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57 && /^\\d{0,}$/.test(this.value))"/>
            </div>
            <div class="card-expiration">
              <input type="tel" name="expiration" id="expiration" placeholder="MM/YY"  maxlength="5" 
              onkeypress="return (event.charCode >= 47 && event.charCode <= 57)"/>         
            </div>
            <div class="card-cvc">
              <input type="tel" name="cvc" id="cvc" placeholder="cvc" maxlength="3" 
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57 && /^\\d{0,}$/.test(this.value))"/>
            </div>
          </div>
          <button class="button" type="submit">confirm</button>
        </form>
    `;


    purchase.classList.add('purchase');
    // required

    const form: HTMLElement | null = document.querySelector('form');
    const name: HTMLInputElement | null = document.querySelector('#name');
    // const phone: HTMLInputElement | null = document.querySelector('#phone');
    // const address: HTMLInputElement | null = document.querySelector('#address');
    // const email: HTMLInputElement | null = document.querySelector('#email');
    // const cardNumber: HTMLInputElement | null = document.querySelector('#card-number');
    // const expiration: HTMLInputElement | null = document.querySelector('#expiration');
    // const cvc: HTMLInputElement | null = document.querySelector('#cvc');

    form?.addEventListener('submit', e => {
        e.preventDefault();
        // const array = [name, phone, address, email, cardNumber, expiration, cvc].map(function (elem, index, arr) {
        //     // const key = elem as keyof typeof regExpValue;
        //     fieldValidation((elem), regExpValue.elem)

        fieldValidation(name);
        // console.log('object :>> ', object);
    })

    function fieldValidation(inputItem: HTMLInputElement | null) {
        const xxx = inputItem?.name;
        const regExp = regExpValue.xxx;
        if (inputItem !== null) {
            const inputValue = inputItem.value.trim();
            if (regExp?.test(String(inputValue))) {
                setSuccess(inputItem);
            } else {
                setError(inputItem);
            }
        }
    }

    const regExpValue = {
        name: /[a-zA-Z]{3,}(\s[a-zA-Z]{3,})+$/,
        phone: /^\+(\d{9,})/,
        address: /[a-zA-Z0-9]{5,}((\s[a-zA-Z0-9]{5,}){2,})+$/,
        email: /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-z]{2,6}$/,
        cardNumber: /^[0-9]{16}$/,
        expiration: /^([0][1-9]|[1][0-2])\/[0-9]{2}$/,
        cvc: /^[0-9]{3}$/
    }

    function setError(inputItem: HTMLInputElement) {
        inputItem.classList.add('error');
        inputItem.classList.remove('success');
        return false
    }
    function setSuccess(inputItem: HTMLInputElement) {
        inputItem.classList.add('success');
        inputItem.classList.remove('error');
        return true
    };
}

export { createPurchaseModal }