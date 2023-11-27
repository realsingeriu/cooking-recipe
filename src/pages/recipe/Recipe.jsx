import { useParams } from 'react-router-dom';
import './Recipe.css';
import { useFetch } from '../../hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { firedb } from '../../../firebase/config';


export default function Recipe() {
  const {mode} = useContext(ThemeContext);
  const { id } = useParams();
  // const url = 'http://localhost:3030/recipes/' + id;
  // const { error, isPending, data: recipe } = useFetch(url);
  const [recipe, setRecipe] = useState(null); // 레시피 
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true); //작업 시작 
    firedb.collection('recipes').doc(id).get().then((doc) => {
      //console.log(doc);
      if (doc.exists) {
        setIsPending(false); // 작업 끌
        setRecipe(doc.data());
      } else {
        setIsPending(false); // 작업 끝
        setError('레시피를 찾을 수 없습니다.'); // 에러 메세지 
      }
    });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}

      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p className='time'>요리시간 {recipe.cookingTime} 완성!</p>
          <ul>
            {recipe.ingredients.map((ing,idx) => <li key={idx}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
