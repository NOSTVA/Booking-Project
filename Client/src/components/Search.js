import React from "react";
import { FormControl, Input } from "@chakra-ui/react";

function Search({ term, setTerm }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormControl>
        <Input
          variant="filled"
          type="text"
          value={term}
          placeholder="Search by passport number"
          onChange={(e) => setTerm(e.target.value)}
        />
      </FormControl>
    </form>
  );
}

export default Search;
