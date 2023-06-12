class Basket {
    constructor() {
        this.basket = [];
    }
    addProduct(product) {
        this.basket.push(product);
    }
    resetBasket() {
        this.basket = [];
    }
    removeProduct(productNumber) {
        this.basket.splice(productNumber-1);
    }
}

export default Basket;