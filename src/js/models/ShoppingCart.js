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
export const total = (arr) => {
    // debugger
    let total = 0;
    if (arr.length > 0) {
        arr.forEach(product => {
            total += parseInt(product.sum);
        })
    }
    return parseInt(total).toFixed(2);
};

export const onRemove = (products, id) => {
    const index = products.findIndex(product => product.id === id);
    products.splice(index, 1).slice();
    return total(products)
};