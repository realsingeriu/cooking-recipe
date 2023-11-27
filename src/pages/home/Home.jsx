import React, { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList';

import './Home.css';

export default function Home() {
  //const { data, isPending, error } = useFetch('http://localhost:3030/recipes');
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    setIsPending(true);
    firedb.collection('recipes').get().then((snapshot) => {
      //console.log(snapshot.docs[0].data());
      if (snapshot.empty) {
        setError('레시피가 없습니다.');
        setIsPending(false);
      } else {
        let results = [];
        snapshot.docs.forEach(doc => {
          //console.log(doc);
          results.push({ id: doc.id, ...doc.data() });
        });
        setData(results);
        setIsPending(false);
      }
    }).catch(err => {
      setError(err.message);
      setIsPending(false);
    });
  }, [dependencies]);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">로딩중...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
