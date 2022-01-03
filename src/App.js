import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import NavigationHeader from "./components/layout/Navigation";
import Search from "./components/Search";

const App = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
  };

  console.log(searchInput)

  return (
    <div className="App">
      <NavigationHeader title="Image Gallery" />
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
