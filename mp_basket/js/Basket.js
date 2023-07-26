class Basket {
    constructor() {
        this.basket = this.loadFromLocalStorage() ?? [];
    }
    addProduct(product) {
        this.basket.push(product);
        this.saveToLocalStorage();
    }
    resetBasket() {
        this.basket = [];
        this.saveToLocalStorage();
    }
    removeProduct(productNumber) {
        this.basket.splice(productNumber - 1, 1);
        this.saveToLocalStorage();
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
    saveToLocalStorage() {
        localStorage.setItem("basket-items", JSON.stringify(this.basket));
    }
    loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem("basket-items"));
    }
}

export default Basket;
