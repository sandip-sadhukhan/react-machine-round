import "./App.css";
import AutoComplete from "./components/autocomplete";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.recipes;
  };

  return (
    <div>
      <h1>Autocomplete / Typeahead</h1>

      <AutoComplete
        placeholder="Enter Recipe"
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey="name"
        customLoading={<>Loading Receipes</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
