document.addEventListener("DOMContentLoaded", function () {
  let app = document.querySelector("#app");
  let products = [];
  let page = 1;

  //
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();

      if (data && data.products) {
        console.log(data);
        products = data.products;
        render();
      }
    } catch (error) {
      console.log("Error fetching products ", error);
    }
  };

  const render = () => {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");
    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("paginations");
    if (products.length > 0) {
      products.slice(page * 10 - 10, 10 * page).forEach((prod) => {
        const productElement = document.createElement("div");
        productElement.classList.add("products__single");
        productElement.innerHTML = `
            <img
            src="${prod.thumbnail}"
            alt="${prod.title}"
            />
            <span>${prod.title}</span>
            `;
        productsContainer.appendChild(productElement);
      });

      // prev button
      if (page > 1) {
        const prevBtn = createPaginationButton("◀️", () => {
          selectPageHandler(page - 1);
        });
        paginationContainer.appendChild(prevBtn);
      }
      //display number button

      for (let i = 0; i < products.length / 10; i++) {
        const pageButton = createPaginationButton(
          i + 1,
          () => {
            selectPageHandler(i + 1);
          },
          page === i + 1
        );
        paginationContainer.appendChild(pageButton);
      }

      // next button
      if (page < products.length / 10) {
        const nextBtn = createPaginationButton("▶️", () => {
          selectPageHandler(page + 1);
        });
        paginationContainer.appendChild(nextBtn);
      }
    }

    app.innerHTML = "";
    app.appendChild(productsContainer);
    app.appendChild(paginationContainer);
  };

  const createPaginationButton = (text, clickHander, isSelected = false) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHander);

    if (isSelected) {
      button.classList.add("pagination__selected");
    }
    return button;
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    ) {
      page = selectedPage;
      render()
    }
  };
  fetchProducts();
});
