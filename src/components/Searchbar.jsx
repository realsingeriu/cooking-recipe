import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Searchbar.css';



export default function searchbar() {
  const [term, setTerm] = useState(''); // 검색어
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
  };

  return (
    <div className='Searchbar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input type="text" id='search' onChange={e => setTerm( e.target.value )} />
      </form>
    </div>
  );
};

