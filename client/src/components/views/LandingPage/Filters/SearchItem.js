import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

function SearchItem(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = event => {
    setSearchTerm(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="Search"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchItem;
