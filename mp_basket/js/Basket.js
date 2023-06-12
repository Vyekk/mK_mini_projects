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
        this.basket.splice(productNumber - 1);
    }
    getBusketSummary() {
        return this.basket.map((product, i) => {
            return {
                id: i + 1,
                text: `${product.name} - ${product.price.toFixed(0)}zł`,
            };
        });
    }
    getBusketTotalPrice() {
        return this.basket.reduce((prev, curr) => (prev += curr.price), 0);
    }
}

export default Basket;
