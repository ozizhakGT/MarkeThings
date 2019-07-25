//SHOPPING CART MODEL

//DUPLICATE VALIDATION BEFOR EPUSH TO SHOPPING CART ARRAY
export const checkDuplicateProducts = (arr, product) => {
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === product['id']) {
                return false;
            }
        }
    }
    return true;
};

// WILL CALCULATE TOTAL SUMS OF ALL PRODUCTS IN THE SHOPPING CART
export const calculateTotalPrice = (arr) => {
    let total = 0;
    if (arr.length > 0) {
        arr.forEach(product => {
            total += parseInt(product.sum);
        })
    }
    return parseInt(total).toFixed(2);
};

// REMOVE PRODUCT FROM STATE PRODUCTS ARRAY
export const onRemove = (products, id) => {
    const index = products.findIndex(product => product.id === id);
    products.splice(index, 1).slice();
};


export const onReset = (state) => {
    state['shoppingCart'] = [];
}