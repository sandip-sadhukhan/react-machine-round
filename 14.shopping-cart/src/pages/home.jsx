import { useMemo, useState } from "react";
import { ShoppingCartState } from "../context/context"
import Pagination from "../components/pagination";
import StarRating from "../components/star-rating";
import Filters from "../components/filters";

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    state: {products, cart},
    filterState: {sort, byStock, byRating, searchQuery},
    dispatch
  } = ShoppingCartState();

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;
    
    if (sort) {
      filteredProducts = filteredProducts.sort((a,b) => {
        if (sort === "lowToHigh") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
    }

    if (!byStock) {
      filteredProducts = filteredProducts.filter((prod) => prod.inStock);
    }

    if (byRating){
      filteredProducts = filteredProducts.filter(prod => prod.rating >= byRating)
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(prod => prod.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filteredProducts;
  }, [sort, byStock, byRating, searchQuery, products])

  return (
    <div>
      <div className="py-9 flex">
        {/* Filters */}
        <Filters />

        {/* Products */}
        {filteredProducts.length > 0 && (
          <div className="products w-full">
            {filteredProducts?.slice(page * 10 - 10, page * 10).map((prod) => {
              const inCart = cart.findIndex(p => p.id === prod.id) > -1;
              return (
                <span className={`products__single`} key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                  <hr />
                  <span>$ {prod.price}</span>
                  <StarRating rating={prod.rating} />
                  <button
                    className={`px-2 py-1 mt-2 ${!inCart ? "bg-orange-600" : "bg-blue-400"} disabled:opacity-50`}
                    disabled={!prod.inStock}
                    onClick={() => dispatch({
                      type: inCart ? "REMOVE_FROM_CART" : "ADD_TO_CART",
                      payload: prod
                    })}
                  >
                    {prod.inStock ? inCart ? "Remove from Cart" : "Add to Cart" : "Out of Stock"}
                  </button>
                </span>
              );
            })}
          </div>
        )}

      </div>
        {filteredProducts.length > 0 && (
          <Pagination products={filteredProducts} page={page} setPage={setPage} />
        )}
    </div>
  )
}

export default Home