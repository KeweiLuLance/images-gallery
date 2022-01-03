import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import NavigationHeader from "./components/layout/Navigation";
import Search from "./components/Search";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const App = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);

    fetch(
      `https://api.unsplash.com/photos/random/?query=${searchInput}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setSearchInput("");
  };

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
