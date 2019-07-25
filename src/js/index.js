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
import {total} from "./models/ShoppingCart";

/*
* GLOBAL STATE OF THE APP
* - PRODUCT OBJECT
* - SHOPPING CART OBJECT
* - total sum of all Products
* */
const state = {};


// Product Controller
const productController = async () => {
    // GETTING PRODUCTS DATA FOR CATALOG SECTION
    await api.getProducts('./assedts/data.json').then(res => {

        // ADDING TO STATE PRODUCTS ARRAY PRODUCT CLASS WITH ALL INFORMATION AND METHODS
        state.products = JSON.parse(res).map(product => {
            return new Product(product.id, product.title, product.price, product.image)
        })
    })
    .catch(err => {
        elements.errorCode.style.display = 'block';
        alert(`Their Was some Problem getting data.. use browser console for debugging`);
        console.error(err)
    });
    //IF ITS NOT EMPTY ARRAY RENDERING EVERY PRODUCT TO CATALOG VIEW
    if (state.products) {
        state.products.forEach(product => {
            ProductView.renderProduct(product)
        })
    }
};

// Shopping Cart Controller
const shoppingCartController = (product, el) => {
    // CREATE SHOPPING CART ARRAY
    if (!state.shoppingCart) {
        state.shoppingCart = [];
    }
    /*
    * CHECKING DUPLICATE PRODUCTS
    * ADD TO THE SHOPPING CART ARRAY
    * UPDATE TOTAL GLOBAL PRICE IN THE STATE
    * */
    if (ShoppingCart.checkDuplicateProducts(state.shoppingCart, product)) {
        state.shoppingCart.push(product);
        ShoppingCartView.addToList(product);
        state.total = ShoppingCart.calculateTotalPrice(state.shoppingCart);
        // HIDE EMPTY CART CONTAINER
        if (elements.shoppingCart.parentElement.querySelector('.no-item')) {
            ShoppingCartView.emptyCartRender('remove');
        }
    }
    /*
    * RESPONSIBLE ABOUT REMOVE PRODUCT FROM THE SHOPPING CART
    * UPDATE GLOBAL TOTAL PRICE
    * */
    if (el.target.classList.contains('remove-btn')) {
        if (confirm(`Are you sure you want to delete ${product.title}?`)) {
            ShoppingCart.onRemove(state.shoppingCart, product.id);
            state.total = ShoppingCart.calculateTotalPrice(state.shoppingCart);
            elements.shoppingCart.removeChild(el.target.closest('.item'));

            //WILL RETURN THE EMPTY CART CONTAINER IF THE SHOPPING CART ARRAY EMPTY
            if (state.shoppingCart.length === 0) {
                ShoppingCartView.emptyCartRender('add');
            }
        }
    }
};

// HTTP REQUEST GETTING PRODUCTS DATA WHEN LOADING BODY ELEMENT
const init = async () => {
    await productController();
};

document.body.onload = init;

// BUTTONS HANDLERS.
document.querySelector('main').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {

        // take the product from the write component (catalog / shopping-cart)
        let product = '';
        if (e.target.closest('.product')) {
            product = state.products[parseInt(e.target.closest('.product').dataset.id) - 1];
        } else {
            product = state.products[parseInt(e.target.closest('.item').dataset.id) - 1];
        }
        /*
        * Increase and Decrease Number of items in INPUT by clicking on + and -
        *  Effect Both Components (catalog / shopping-cart)
        * */
        if (e.target.closest('.number-of-items')) {
            e.target.closest(".number-of-items").querySelector('input').value = product.onChangeItems(e.target.textContent);

            // By Clicking add to cart or remove from the cart will turn on the Shopping Cart Controller
        } else if (e.target.classList.contains('add-chart') || e.target.classList.contains('remove-btn')) {
            shoppingCartController(product, e)
        }

        /*
        * Will listen on Every change on Single Item and ALL Items Quantity in the Shopping cart
        * Will Calculate the to total price in single Item and TOTAL GLOBAL PRICE TO PAY
        * */
        if (e.target.closest('.item__action')) {
            e.target.closest('.item__action').querySelector('.sum-price').innerHTML = `<b>Total Price:</b> $${product.sum}`;
            state.total = ShoppingCart.calculateTotalPrice(state.shoppingCart);
        }
    }
    // WILL RESET THE SHOPPING CART
    if (e.target.className === 'clear') {
        if (state.shoppingCart && state.shoppingCart.length > 0) {
            if (confirm('You might lose all your Shopping Products , are you sure you want to do this?')) {
                ShoppingCartView.clearCart();
                ShoppingCartView.emptyCartRender('add');
                ShoppingCart.onReset(state);
                state.total = ShoppingCart.calculateTotalPrice(state.shoppingCart);
            }
        } else {
            alert('Your Shopping Cart is Empty')
        }
    }
    // Will update TOTAL GLOBAL PRICE TO PAY IN THE VIEW
    if (state.shoppingCart) {
        ShoppingCartView.updateTotalPrice(state.total);
    }

});