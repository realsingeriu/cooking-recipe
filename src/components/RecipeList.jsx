import { Link } from 'react-router-dom';
import './RecipeList.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { firedb } from '../../firebase/config';
import Trashcan from '../assets/delete-icon.svg';


export default function RecipeList({ recipes }) {
  const {mode} = useContext(ThemeContext);
  if (recipes.length === 0) {
    return <div className='error'>검색된 레시피가 없습니다.</div>;
  }
  const handleClick = (id) => {
    if(confirm('정말로 삭제하시겠습니까?')) {
      firedb.collection('recipes').doc(id).delete();
    }
  };
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method && recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>요리하기</Link>
          <img src={Trashcan} alt="" className='delete' onClick={() => handleClick(recipe.id)} />
        </div>
      ))}
    </div>
  );
}
