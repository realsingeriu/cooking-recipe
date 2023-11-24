import React from "react"
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

export default function Navbar() {
return (
      <nav>
        <Link to="/" className='brand'>
          <h1>쿠킹 레시피</h1>
        </Link>
        <Searchbar />
        <Link to="/create">레시피 만들기</Link>
      </nav>
  );
}
      