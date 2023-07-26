import Basket from "./Basket.js";
import Product from "./Product.js";

const productBtns = document.querySelectorAll("[data-name]");
const uiBasket = document.querySelector(".basket-list");
const buyAllBtn = document.querySelector(".btn-buy-all");
const adminAddProductForm = document.querySelector(".admin-add-product form");
const productList = document.querySelector(".product-list");

const basket = new Basket();

const saveToLocalStorage = (name, price) => {
    const shopProducts =
        JSON.parse(localStorage.getItem("shop-products")) ?? [];
    shopProducts.push({ name, price });
    localStorage.setItem("shop-products", JSON.stringify(shopProducts));
};

const loadFromLocalStorage = () => {
    const shopProducts =
        JSON.parse(localStorage.getItem("shop-products")) ?? [];
    for (const { name, price } of shopProducts) {
        addProductToShop(name, price);
    }
};

const createUiBasket = () => {
    uiBasket.innerText = "";
    for (const { id, text } of basket.getBusketSummary()) {
        const productLi = document.createElement("li");
        productLi.innerText = text;
        productLi.dataset.id = id;
        productLi.addEventListener("click", removeItemFromBusket);
        uiBasket.appendChild(productLi);
    }
    buyAllBtn.innerText = `Złóż zamówienie za ${basket
        .getBusketTotalPrice()
        .toFixed(2)}zł`;
    buyAllBtn.disabled = basket.getBusketTotalPrice() === 0;
};

const removeItemFromBusket = (event) => {
    basket.removeProduct(event.target.dataset.id);
    createUiBasket();
};

const addProductToBasket = (event) => {
    const productName = event.target.dataset.name;
    const productPrice = Number(event.target.dataset.price);
    const newProduct = new Product(productName, productPrice);
    basket.addProduct(newProduct);
    createUiBasket();
};

const handleBuyAllButton = () => {
    alert(`Złożono zamówienie na wszystkie wybrane przez Ciebie produkty`);
    basket.resetBasket();
    createUiBasket();
};

const addProductToShop = (newProductName, newProductPrice) => {
    const productLi = document.createElement("li");
    const strongName = document.createElement("strong");
    const priceNode = document.createTextNode(` - ${newProductPrice}zł `);
    const buyBtn = document.createElement("button");
    buyBtn.innerText = "Kup";
    buyBtn.classList.add("btn-buy-item");
    buyBtn.dataset.name = newProductName;
    buyBtn.dataset.price = newProductPrice;
    buyBtn.addEventListener("click", addProductToBasket);
    strongName.innerText = newProductName;

    productLi.appendChild(strongName);
    productLi.appendChild(priceNode);
    productLi.appendChild(buyBtn);
    productList.appendChild(productLi);
};

const handleAddProductFormSubmit = (event) => {
    event.preventDefault();
    const newProductName = event.target.elements["product-name"].value;
    const newProductPrice = event.target.elements["product-price"].value;
    addProductToShop(newProductName, newProductPrice);
    saveToLocalStorage(newProductName, newProductPrice);
    event.target.reset();
};

productBtns.forEach((button) => {
    button.addEventListener("click", addProductToBasket);
});
buyAllBtn.addEventListener("click", handleBuyAllButton);
adminAddProductForm.addEventListener("submit", handleAddProductFormSubmit);

createUiBasket();
loadFromLocalStorage();
