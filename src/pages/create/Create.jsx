import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './Create.css';
import {useEffect, useRef, useState} from 'react';

export default function Create() {
    // State를 사용하여 각각의 입력 필드에 대한 상태를 관리합니다.
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');

     // 새로운 재료를 추가하는 기능을 위한 상태와 참조를 설정합니다.
    const [newIngredient, setNewIngredient] = useState(''); // 한개 재료
    const [ingredients, setIngredients] = useState([]); // 재료모음 배열
    const ingredientInput = useRef(); // 특정 태그를 지정
    const {postData, data} = useFetch('http://localhost:3030/recipes', 'POST');
    const navigate = useNavigate();
    // useFatch를 사용해서 데이터를 서보로 전송후 결과를 받았을때 (data가 바뀔때) 홈으로 이동
  
    useEffect(() => {
      if (data) {
        navigate("/");
      }
    }, [data, navigate]);
    //console.log(data);

    // '사용' 버튼을 클릭할 때 실행되는 함수로, 재료를 추가합니다.
    const handleAdd = (e) => {
      e.preventDefault();
      const ing = newIngredient.trim(); // 입력된 재료의 공백 제거
      // 입력된 재료가 유효하고, 기존의 재료 목록에 포함되어 있지 않다면 추가합니다.
      if (ing && !ingredients.includes(ing)) {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
      }
       // 입력 필드를 초기화하고, 다시 입력을 받을 수 있도록 포커스를 맞춥니다.
      setNewIngredient(''); // 새 재료는 공백으로 초기화 
      ingredientInput.current.focus(); // 커서를 정해진 태그에 위치 
    };

    // 폼이 제출될 때 실행되는 함수로, 입력된 데이터를 콘솔에 출력합니다.
    const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log({title, method, ingredients, cookingTime});
      postData({
        title : title,
        method : method,
        ingredients : ingredients,
        cookingTime : cookingTime + '분',
      })
    };

  return (
    <div className="create">
      <h2 className="page-title">새 레시피를 추가하세요</h2>
      <form onSubmit={handleSubmit}>
        {/* 요리 제목 입력 필드 */}
        <label>
          <span>요리 제목:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

     
        {/* 요리 재료 입력 필드 */}
        <label>
          <span>요리 재료:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            {/* '사용' 버튼 클릭 시 handleAdd 함수 실행 */}
            <button onClick={handleAdd} className="btn">사용</button>
          </div>
        </label>
        {/* 입력된 재료 목록을 출력 */}
        <p>재료들 : {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        {/* 요리 방법 입력 필드 */}
        <label>
          <span>요리 방법:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        {/* 쿠킹 타임 입력 필드 */}
        <label>
          <span>쿠킹 타임 (분):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        {/* 폼 제출 버튼 */}
        <button className="btn">추가</button>
      </form>
    </div>
  );
};

