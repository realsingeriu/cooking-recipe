import React, { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList';
import './Home.css';
import { firedb } from '../../firebase/config';


export default function Home() {
  //const { data, isPending, error } = useFetch('http://localhost:3030/recipes');
  const [data, setData] = useState(null); // 데이터
  const [isPending, setIsPending] = useState(false); // 로딩상태
  const [error, setError] = useState(false); // 에러상태
  
  useEffect(() => {
    // 파이어스토어에서 데이터 가져오기 
    setIsPending(true); // 데이터 가져오기 시작 
    const unsub = firedb.collection('recipes').onSnapshot((snapshot)=> {
      //console.log(snapshot.docs[0].data());
      if (snapshot.empty) {
        setError('레시피가 없습니다.'); //에러 메세지 
        setIsPending(false); // 작업 끌 
      } else {
        let results = [];
        snapshot.docs.forEach(doc => {
          //console.log(doc);
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
        setIsPending(false); // 작업 끝
      }
    }, (error) => {
      setError(error.message);
      setIsPending(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
