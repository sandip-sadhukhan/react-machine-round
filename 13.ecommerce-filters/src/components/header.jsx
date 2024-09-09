import { ShoppingCartState } from "../context/context"

const Header = () => {
  const {
    filterState: {searchQuery}, filterDispatch
  } = ShoppingCartState();

  return (
    <nav className="h-5 flex items-center justify-between">
      <h2 className="text-2xl font-mono">Sandip Sadhukhan Store</h2>
      <input
        type="text"
        placeholder="Search a Product..."
        className="p-2"
        value={searchQuery}
        onChange={e => filterDispatch({
          type: "FILTER_BY_SEARCH",
          payload: e.target.value
        })}
      />
    </nav>
  )
}

export default Header