import {elements} from "./base";

// ADDING PRODUCT TO THE CART LIST
export const addToList = (product) => {
    let markup = `
                    <div class="item" data-id="${product.id}">
                      <div>
                          <button class="btn remove-btn">X</button>
                          <div class="item__info">
                             <img class="item__info--image" src="${product.image}">
                             <p class="item__info--desc">${product.title}</p>
                      </div>
                     </div>
                    <div class="item__action">
                        <div class="number-of-items">
                            <button class="btn">+</button>
                            <input type="number" value="${product.items}" min="1" max="10">
                            <button class="btn">-</button>
                        </div>
                        <p class="sum-price"><b>Total Price:</b>$${product.sum}</p>
                    </div>
                </div>
    `;

    elements.shoppingCart.insertAdjacentHTML('beforeend', markup)
};

// UPDATE TOTAL PRICE
export const updateTotalPrice = (total) => {
    if (parseInt(total) !== parseInt(elements.total.textContent)) {
        elements.total.textContent = total;
    }
}

// BY METHOD TYPE WILL REMOVE/ADDING EMPTY CART CONTAINER
export const emptyCartRender = (method) => {
    if (method === 'remove') {
        if (!elements.empty.classList.contains('hide')) {
            elements.empty.classList.add('hide');
        }
    } else {
        elements.empty.classList.remove('hide');
    }
}

// CLEAR CART LIST
export const clearCart = () => {
    elements.shoppingCart.innerText = ''
}