import React, { useEffect } from 'react'
import { ShoppingCartState } from '../context/context'
import StarRating from './star-rating';
import {useSearchParams} from 'react-router-dom'

const filterMap = {
  sort: "SORT_BY_PRICE",
  byRating: "FILTER_BY_RATING",
  byStock: "FILTER_BY_STOCK",
  searchQuery: "FILTER_BY_SEARCH"
}

const Filters = () => {
  const {filterState, filterDispatch} = ShoppingCartState()
  const {byStock, sort, byRating} = filterState;
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.size) {
      searchParams.forEach((value, key) => {
        filterDispatch({
          type: filterMap[key],
          payload: value,
        })
      })
    }

  }, [])

  useEffect(() => {
    setSearchParams(filterState);
  }, [filterState])

  return (
    <div className="flex flex-col w-96 gap-2">
      <span className='font-bold'>Filter Products</span>
      <span>
        <input
          type="radio"
          className='mr-2'
          name="sort"
          id="Ascending"
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh"
            })}
          checked={sort === 'lowToHigh'}
          />
        <label htmlFor="Ascending">Ascending</label>
      </span>
      <span>
        <input
          type="radio"
          className='mr-2'
          name="sort"
          id="Descending"
          onChange={() =>
            filterDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow"
            })}
          checked={sort === 'highToLow'}
          />
        <label htmlFor="Descending">Descending</label>
      </span>

      <span>
        <input
          type="checkbox"
          className='mr-2'
          id="outofstock"
          name="outofstock"
          onChange={() =>
            filterDispatch({
              type: "FILTER_BY_STOCK",
              payload: !byStock
            })}
          checked={byStock}
          />
        <label htmlFor="outofstock">Include Out of Stock</label>
      </span>

      <span className="flex items-center">
        <label className="pr-2">Rating</label>
        <StarRating
          rating={byRating}
          onChange={(_rating) => {
            filterDispatch({
              type: "FILTER_BY_RATING",
              payload: _rating
            })
          }}
        />
      </span>

      <button
        className="bg-slate-500 text-white rounded-sm"
        onClick={() => {
          filterDispatch({
            type: "CLEAR_FILTERS"
          })
        }}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default Filters
// 26.20