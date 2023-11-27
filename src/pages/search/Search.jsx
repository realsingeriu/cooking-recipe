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
    // firestore에서 레시피 데이터를 query하여 가져오는 비동기 함수 
    firedb
      .collection('recipes')
      .where('title', '>=', query) // title이 쿼리보다 크거나 같은 경우 
      .where('title', '<=', query + '\uf8ff') // title이 쿼리 + \uf8ff 보다 작거나 같은 경우 
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          // 쿼리에 해달하는 레시피가 없는 경우 
          setIsPending(false);
        } else {
          // 쿼리에 해달하는 레시피가 있는 경우 
          let results = [];
          snapshot.docs.forEach((doc) => {
            //console.log(doc);
            // firestore 문서를 javascript 객체로 변환하여 결과 배열에 추가 
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results); // 데이터 상태 업데이트 
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message); // 에러 상태 업데이트 
        setIsPending(false);
      });
  }, [query]); // 쿼리 값이 변경될 때마다 useEffect가 실행 

  return (
    <div>
      <h2 className="page-title">"{query}"를 포함하는 레시피는 </h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}