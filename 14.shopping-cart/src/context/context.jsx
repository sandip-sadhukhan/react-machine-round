import { createContext, useContext, useEffect, useReducer } from "react";
import { filterReducer, shoppingCartReducer } from "./reducer";

const ShoppingCart = createContext()

const Context = ({children}) => {
  // product state
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    products: [],
    cart: [],
    categories: []
  });

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: "",
    byCategory: null,
  })

  const fetchProducts = async() => {
    const res = await fetch(`/products.json`);
    const data = await res.json();

    if (data && data.products) {
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data.products
      })
    }
  }
  
  const fetchCategories = async() => {
    const res = await fetch(`/categories.json`);
    const data = await res.json();

    if (data) {
      dispatch({
        type: "FETCH_CATEGORIES",
        payload: data
      })
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return (
    <ShoppingCart.Provider value={{state, dispatch, filterState, filterDispatch}}>
      {children}
    </ShoppingCart.Provider>
  );
}

export const ShoppingCartState = () => {
  return useContext(ShoppingCart)
}

export default Context;