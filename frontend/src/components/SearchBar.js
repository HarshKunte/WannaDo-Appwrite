import React, { useState } from 'react';
function SearchBar({searchTodos}) {
    const [searchText, setSearchText] = useState("");

    const search =() =>{
        // navigate(`/search?query=${searchText}`)
        searchTodos(searchText)
        setSearchText("")
    }
    return ( 
        <div class="form-control px-6 xl:px-16 mt-8 float-left md:float-right">
  <div class="input-group input-group-sm">
    <input onChange={(e) => {
        setSearchText(e.target.value)}} type="text" value={searchText} placeholder="Search…" class="input input-bordered input-sm" />
    <button class="btn btn-square btn-sm" onClick={search}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
     );
}

export default SearchBar;