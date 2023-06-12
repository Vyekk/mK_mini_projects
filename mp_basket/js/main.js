import Basket from "./Basket.js";
import Product from "./Product.js";

const productBtns = document.querySelectorAll("[data-name]");
const uiBasket = document.querySelector(".basket-list");
const buyAllBtn = document.querySelector(".btn-buy-all");

const basket = new Basket();

const createUiBasket = () => {
    uiBasket.innerText = "";
    for (const { id, text } of basket.getBusketSummary()) {
        const productLi = document.createElement("li");
        productLi.innerText = text;
        productLi.dataset.id = id;
        uiBasket.appendChild(productLi);
    }
    buyAllBtn.innerText = `Złóż zamówienie za ${basket
        .getBusketTotalPrice()
        .toFixed(2)}zł`;
    buyAllBtn.disabled = basket.getBusketTotalPrice() === 0;
};

const addProductToBasket = (event) => {
    const productName = event.target.dataset.name;
    const productPrice = Number(event.target.dataset.price);
    const newProduct = new Product(productName, productPrice);
    basket.addProduct(newProduct);
    createUiBasket();
};

productBtns.forEach((button) => {
    button.addEventListener("click", addProductToBasket);
});

buyAllBtn?.addEventListener("click", () => {
    alert(`Złożono zamówienie na wszystkie wybrane przez Ciebie produkty`);
    basket.resetBasket();
    createUiBasket();
});
