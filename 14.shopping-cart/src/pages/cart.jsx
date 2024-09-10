import React from 'react'
import { ShoppingCartState } from '../context/context'
import StarRating from '../components/star-rating';

const Cart = () => {
  const {state: {cart}, dispatch} = ShoppingCartState();

  return (
    <div className="py-9 flex flex-col gap-5">
      <div className='text-2xl text-center'>Sub-total: ${cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)}</div>
      {cart.map(prod => {
        return (
          <span key={prod.id} className='flex h-36 items-center justify-between border-2 p-5'>
            <img src={prod.thumbnail} alt={prod.title} className='h=full w-48 object-contain' />
            <div className="flex flex-col">
              <span>{prod.title}</span>
              <span>${prod.price}</span>
            </div>
            <StarRating rating={prod.rating} />

            {/* Add change cart quantity */}
            <button
              className="bg-orange-400 px-2 rounded-sm text-xl"
              onClick={() => dispatch({
                type: "CHANGE_CART_QTY",
                payload: {id: prod.id, qty: prod.qty + 1}
              })}
            >
                +
              </button>
            <span>{prod.qty}</span>
            <button className="bg-orange-400 px-2 rounded-sm text-xl"
            
              onClick={() => dispatch({
                type: "CHANGE_CART_QTY",
                payload: {id: prod.id, qty: prod.qty - 1}
              })}
            >-</button>

            <button
              className={`px-2 py-1 mt-2 bg-blue-400`}
              onClick={() => dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod
              })}
            >
              Remove from Cart
            </button>
          </span>
        )
      })}
    </div>
  )
}

export default Cart