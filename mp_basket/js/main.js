import Basket from "./Basket.js";
import Product from "./Product.js";

const basket = new Basket();
const tomato = new Product("Pomidor", 12.50);
const watermelon = new Product("Arbuz", 23.00);
const cucumber = new Product("Ogórek", 8.99);

basket.addProduct(tomato);
console.log(basket);