let products;
let currentPage = 1;
const productsPerPage = 10;

const fetchProducts = async () => {
  const api = "https://dummyjson.com/products?limit=100"
  const response = await fetch(api);
  const data = await response.json();
  return data.products;
}

const createProductEl = (product) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");

    const productTitleEl = document.createElement("h3");
    productTitleEl.textContent = `${product.id}. ${product.title}`;
    productTitleEl.classList.add("product-title");

    const productDescriptionEl = document.createElement("p");
    productDescriptionEl.textContent = product.description;
    productDescriptionEl.classList.add("product-description");

    productEl.appendChild(productTitleEl);
    productEl.appendChild(productDescriptionEl);

    return productEl;
}

const getCurrentPageProducts = (products, currentPage, productsPerPage) => {
    const startIndex = (productsPerPage * (currentPage - 1));
    const endIndex = productsPerPage * currentPage;
    return products.slice(startIndex, endIndex);
}

const renderCurrentPageProducts = (products) => {
    const productsEl = document.getElementById("products");
    productsEl.innerHTML = '';

    products.forEach(product => {
        const productEl = createProductEl(product);
        productsEl.appendChild(productEl);
    })
}

const updateButtonStates = (products, currentPage, productsPerPage) => {
    // Disable Prev/Next Button if needed
    const prevBtnEl = document.querySelector('.pagination button[data-page-value="Prev"]');
    const nextBtnEl = document.querySelector('.pagination button[data-page-value="Next"]');

    prevBtnEl.disabled = currentPage === 1;
    nextBtnEl.disabled = currentPage === Math.ceil(products.length / productsPerPage);

    // Update active class
    if (document.querySelector('.pagination button.active')) {
        document.querySelector('.pagination button.active').classList.remove("active");
    }

    document.querySelector(`.pagination button[data-page-value="${currentPage}"]`).classList.add('active');
}

const updateCurrentPageProducts = (products, currentPage, productsPerPage) => {
    let currentPageProducts = getCurrentPageProducts(products, currentPage, productsPerPage);
    renderCurrentPageProducts(currentPageProducts);
    updateButtonStates(products, currentPage, productsPerPage);
}

const handlePageButtonClick = (event) => {
    let pageValue = event.target.dataset.pageValue;
    if (pageValue === "Next") {
        pageValue = currentPage + 1;
    } else if (pageValue === "Prev") {
        pageValue = currentPage - 1;
    } else {
        pageValue = parseInt(pageValue);
    }

    currentPage = parseInt(pageValue);
    updateCurrentPageProducts(products, currentPage, productsPerPage);
}

const createPageButton = (pageNumber) => {
    const buttonEl = document.createElement("button");
    buttonEl.dataset.pageValue = pageNumber;
    buttonEl.textContent = pageNumber;
    buttonEl.addEventListener("click", handlePageButtonClick)
    return buttonEl
}

const renderPageButtons = (products, productsPerPage) => {
    const totalPage = Math.ceil(products.length / productsPerPage);
    const paginationEl = document.querySelector('.pagination');

    const prevBtnEl = createPageButton("Prev");
    paginationEl.appendChild(prevBtnEl);

    for (let page=1; page <= totalPage; page++) {
        const buttonEl = createPageButton(page);
        paginationEl.appendChild(buttonEl);
    }

    const nextBtnEl = createPageButton("Next");
    paginationEl.appendChild(nextBtnEl);
}

window.addEventListener("DOMContentLoaded", async function() {
    // Fetch all data and store it in array.
    products = await fetchProducts();

    renderPageButtons(products, productsPerPage);
    updateCurrentPageProducts(products, currentPage, productsPerPage);
})