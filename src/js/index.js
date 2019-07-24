// STYLES
import style from '../styles/base.scss';

// API SERVICE
import * as api from './api';
//MODELS
import Product from './models/Product'
// import ShoppingCart from './models/Product'


/*
* GLOBAL STATE OF THE APP
* - PRODUCT OBJECT
* - SHOPPING CART OBJECT
* */
const state = {};

const init = () => {
        api.getProducts('./assets/data.json').then(res => {
            state.pruducts = JSON.parse(res);
        })
};

document.body.onload = init