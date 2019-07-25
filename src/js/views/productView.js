import {elements} from "./base";

export const renderProduct = (product) => {
    let markup =  `<div class="product" data-id="${product.id}">
                    <img class="product__image" src="${product.image}">
                    <div class="product__bottom">
                        <div class="product__info">
                            <p class="product__info--description"><b>Description:</b> ${product.title}</p>
                            <p class="product__info--price"><b>Price:</b> $${product.price}</p>
                        </div>
                        <div class="product__actions">
                            <button class="btn xs-padding add-chart">Add to Chart</button>
                            <div class="number-of-items">
                                <button class="btn">+</button>
                                <input id="test" type="number" value="${product.items}" min="1" max="10">
                                <button class="btn">-</button>
                            </div>
                        </div>
                    </div>
                </div>`;

    elements.catalog.insertAdjacentHTML('beforeend', markup)
}