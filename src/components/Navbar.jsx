import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>쿠킹 레시피</h1>
        </Link>
        <Link to="/create">레시피 만들기</Link>
      </nav>
    </div>
  );
}
