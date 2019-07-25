export class Product {
    constructor(id, title, price, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.items = 1;
        this.sum = this.items * this.price;
    }
    onChangeItems(method) {
        const holder = method === '-' ? this.items-1 : this.items+1;
        if (holder >= 1 && holder <= 10) {
            this.items = holder;
            // return this.items
        }
        this.onIncreasePrice()
        return this.items
    }
    onIncreasePrice() {
        this.sum = (this.items * this.price).toFixed(2);
    }

}