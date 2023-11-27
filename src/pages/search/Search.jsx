import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Search.css';
import { firedb } from '../../firebase/config';
import RecipeList from '../../components/RecipeList';

export default function Search() {
  //요청주소의 쿼리스트링을 가져오는 방법
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q'); //q에 해당 값을 쿼리스트링에서 가져옴
  const [data, setData] = useState([]); //데이터
  const [isPending, setIsPending] = useState(false); //로딩상태
  const [error, setError] = useState(''); //에러메세지

  useEffect(() => {
    setIsPending(true);
    firedb
      .collection('recipes')
      .where('title', '>=', query)
      .where('title', '<=', query + '\uf8ff')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            //console.log(doc);
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [query]);

  return (
    <div>
      <h2 className="page-title">"{query}"를 포함하는 레시피는 </h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}