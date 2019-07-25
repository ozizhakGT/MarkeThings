// STYLES
import style from '../styles/base.scss';

// API SERVICE & ELEMENTS
import {elements} from "./views/base";
import * as api from './api';

// MODELS
import {Product} from './models/Product'
import * as ShoppingCart from './models/ShoppingCart'

// VIEWS
import * as ProductView from './views/productView'
import * as ShoppingCartView from './views/shoppingCartView'

/*
* GLOBAL STATE OF THE APP
* - PRODUCT OBJECT
* - SHOPPING CART OBJECT
* */
const state = {};


// Product Controller
const productController = async () => {
    await api.getProducts('./assets/data.json').then(res => {
        state.products = JSON.parse(res).map(product => {
            return new Product(product.id, product.title, product.price, product.image)
        })
    })

    if (state.products) {
        state.products.forEach(product => {
            ProductView.renderProduct(product)
        })
    }
}

// Shopping Cart Controller
const shoppingCartController = (product) => {
    if (!state.shoppingCart) {
        state.shoppingCart = [];
    }
    if (ShoppingCart.checkDuplicateProducts(state.shoppingCart, product)) {
        state.shoppingCart.push(product);
        ShoppingCartView.addToList(product);
        state.total = ShoppingCart.total(state.shoppingCart);
        if (elements.shoppingCart.querySelector('.no-item')) {
            elements.shoppingCart.removeChild(elements.empty)
        }
    }
}

const init = async () => {
    await productController();
};

document.body.onload = init;

document.querySelector('main').addEventListener('click', (e) => {
    let product = '';
    if (e.target.closest('.product')) {
        product = state.products[parseInt(e.target.closest('.product').dataset.id) - 1];
    } else {
        product = state.products[parseInt(e.target.closest('.item').dataset.id) - 1];
    }
    if (e.target.classList.contains('btn')) {
        if (e.target.closest('.number-of-items')) {
            e.target.closest(".number-of-items").querySelector('input').value = product.onChangeItems(e.target.textContent);

        } else if (e.target.classList.contains('add-chart')) {
            shoppingCartController(product)
        }
        else if (e.target.classList.contains('remove-btn')) {
            if (confirm(`Are you sure you want to delete ${product.title}?`)) {
                state.total = ShoppingCart.onRemove(state.shoppingCart, product.id);
                elements.shoppingCart.removeChild(e.target.parentElement);
            }
        }
    }
    if (e.target.closest('.item__action')) {
        e.target.closest('.item__action').querySelector('.sum-price').innerHTML = `<b>Total Price:</b> $${product.sum}`;
        state.total = ShoppingCart.total(state.shoppingCart);
    }
    console.log(state.total)
    ShoppingCartView.updateTotalPrice(state.total);
    console.log(state)
});